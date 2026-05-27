import express from "express"

function asTrimmedString(value) {
  return typeof value === "string" ? value.trim() : ""
}

function toNullableString(value) {
  const text = asTrimmedString(value)
  return text.length > 0 ? text : null
}

function toBoolean(value) {
  if (typeof value === "boolean") return value
  if (typeof value === "number") return value === 1
  if (typeof value === "string") return ["true", "1", "yes"].includes(value.toLowerCase())
  return false
}

function normalizeDetails(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  return value
}

function pickErrors(payload, requiredFields) {
  const errors = []

  for (const field of requiredFields) {
    if (!asTrimmedString(payload[field])) errors.push(field)
  }

  return errors
}

function normalizePhoneNumber(phoneCountryCode, phone) {
  const prefix = asTrimmedString(phoneCountryCode)
  const number = asTrimmedString(phone)
  if (!prefix && !number) return null
  return [prefix, number].filter(Boolean).join(" ").trim() || null
}

export default async (app, client) => {
  const router = express.Router()

  /**
   * 📌 1. Contact mesajı oluştur
   * POST /v1/contact/message
   */
  router.post("/message", async (req, res) => {
    try {
      const body = req.body ?? {}
      const payload = {
        fullName: asTrimmedString(body.fullName),
        email: asTrimmedString(body.email),
        company: toNullableString(body.company),
        role: toNullableString(body.role),
        phoneCountryIso: toNullableString(body.phoneCountryIso)?.toUpperCase() ?? null,
        phoneCountryCode: toNullableString(body.phoneCountryCode),
        phone: normalizePhoneNumber(body.phoneCountryCode, body.phone),
        website: toNullableString(body.website),
        subjectCategory: asTrimmedString(body.subjectCategory),
        subjectKey: asTrimmedString(body.subjectKey),
        subject: asTrimmedString(body.subject),
        subjectSpecificDetails: normalizeDetails(body.subjectSpecificDetails),
        message: asTrimmedString(body.message),
        pageUrl: toNullableString(body.pageUrl),
        referrer: toNullableString(body.referrer),
        elapsedMs: Number.isFinite(Number(body.elapsedMs)) ? Number(body.elapsedMs) : null,
        botSuspected: toBoolean(body.botSuspected),
      }

      const requiredFields = ["fullName", "email", "role", "subjectCategory", "subjectKey", "subject", "message"]
      const missingFields = pickErrors(payload, requiredFields)

      if (missingFields.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Missing parameters",
          fields: missingFields,
        })
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        return res.status(400).json({
          status: "error",
          message: "Valid email required",
          fields: ["email"],
        })
      }

      if (payload.phoneCountryIso && payload.phoneCountryIso.length !== 2) {
        return res.status(400).json({
          status: "error",
          message: "Valid phone country required",
          fields: ["phoneCountryIso"],
        })
      }

      if (payload.botSuspected || (payload.elapsedMs !== null && payload.elapsedMs < 4000)) {
        return res.status(429).json({
          status: "error",
          message: "Please take a moment before sending again.",
        })
      }

      await client.Database.query(
        `INSERT INTO contact_messages
        (id, fullName, email, company, role, phoneCountryIso, phoneCountryCode, phone,
         subjectCategory, subjectKey, subject, subjectSpecificDetails, message,
         pageUrl, referrer, elapsedMs, botSuspected, ipAddress, userAgent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
        [
          client.uuid,
          payload.fullName,
          payload.email,
          payload.company,
          payload.role,
          payload.phoneCountryIso,
          payload.phoneCountryCode,
          payload.phone,
          payload.subjectCategory,
          payload.subjectKey,
          payload.subject,
          JSON.stringify(payload.subjectSpecificDetails),
          payload.message,
          payload.pageUrl,
          payload.referrer,
          payload.elapsedMs,
          0,
          req.ip ?? null,
          req.get("user-agent") ?? null,
        ]
      )

      return res.json({ status: "success" })
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message })
    }
  })

  /**
   * 📌 2. Contact mesajlarını listele (admin)
   * GET /v1/contact/messages
   */
  router.get("/messages", async (req, res) => {
    try {
      const messages = await client.Database.query(
        "SELECT * FROM contact_messages ORDER BY createdAt DESC"
      )

      return res.json({ status: "success", data: messages })
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message })
    }
  })

  /**
   * 📌 3. Contact mesajlarını filtreli / sayfalı getir (admin)
   * GET /v1/contact/messages/search
   *
   * Örnek:
   * /v1/contact/messages/search?page=1&limit=20
   * /v1/contact/messages/search?search=bahattin
   * /v1/contact/messages/search?subjectCategory=service
   * /v1/contact/messages/search?dateFrom=2026-01-01&dateTo=2026-12-31
   */
  router.get("/messages/search", async (req, res) => {
    try {
      const page = Math.max(Number.parseInt(String(req.query.page ?? "1"), 10) || 1, 1)
      const limit = Math.min(Math.max(Number.parseInt(String(req.query.limit ?? "20"), 10) || 20, 1), 100)
      const offset = (page - 1) * limit

      const search = asTrimmedString(req.query.search)
      const subjectCategory = asTrimmedString(req.query.subjectCategory)
      const subjectKey = asTrimmedString(req.query.subjectKey)
      const role = asTrimmedString(req.query.role)
      const phoneCountryIso = asTrimmedString(req.query.phoneCountryIso).toUpperCase()
      const dateFrom = asTrimmedString(req.query.dateFrom)
      const dateTo = asTrimmedString(req.query.dateTo)

      const where = []
      const params = []

      if (search) {
        const like = `%${search.toLowerCase()}%`
        where.push(`(
          LOWER(fullName) LIKE ? OR
          LOWER(email) LIKE ? OR
          LOWER(company) LIKE ? OR
          LOWER(role) LIKE ? OR
          LOWER(phone) LIKE ? OR
          LOWER(subjectCategory) LIKE ? OR
          LOWER(subjectKey) LIKE ? OR
          LOWER(subject) LIKE ? OR
          LOWER(message) LIKE ? OR
          LOWER(pageUrl) LIKE ? OR
          LOWER(referrer) LIKE ? OR
          LOWER(CAST(subjectSpecificDetails AS CHAR)) LIKE ?
        )`)
        params.push(like, like, like, like, like, like, like, like, like, like, like, like)
      }

      if (subjectCategory) {
        where.push("subjectCategory = ?")
        params.push(subjectCategory)
      }

      if (subjectKey) {
        where.push("subjectKey = ?")
        params.push(subjectKey)
      }

      if (role) {
        where.push("role = ?")
        params.push(role)
      }

      if (phoneCountryIso) {
        where.push("phoneCountryIso = ?")
        params.push(phoneCountryIso)
      }

      if (dateFrom) {
        where.push("createdAt >= ?")
        params.push(`${dateFrom} 00:00:00`)
      }

      if (dateTo) {
        const endDate = new Date(`${dateTo}T00:00:00`)
        if (!Number.isNaN(endDate.getTime())) {
          endDate.setDate(endDate.getDate() + 1)
          where.push("createdAt < ?")
          params.push(endDate.toISOString().slice(0, 19).replace("T", " "))
        }
      }

      const whereSql = where.length > 0 ? ` WHERE ${where.join(" AND ")}` : ""

      const [countResult] = await client.Database.query(
        `SELECT COUNT(*) AS total FROM contact_messages${whereSql}`,
        params
      )

      const total = Number(countResult?.total ?? 0)

      const messages = await client.Database.query(
        `SELECT * FROM contact_messages${whereSql} ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      )

      return res.json({
        status: "success",
        data: messages,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.max(Math.ceil(total / limit), 1),
        },
      })
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message })
    }
  })

  /**
   * 📌 3. Tek contact mesajı getir (admin)
   * GET /v1/contact/messages/:id
   */
  router.get("/messages/:id", async (req, res) => {
    try {
      const messages = await client.Database.query(
        "SELECT * FROM contact_messages WHERE id = ?",
        [req.params.id]
      )

      if (messages.length === 0) {
        return res.status(404).json({ status: "error", message: "Message not found" })
      }

      return res.json({ status: "success", data: messages[0] })
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message })
    }
  })

  /**
   * 📌 4. Mesajı güncelle (admin)
   * PUT /v1/contact/messages/:id
   */
  router.put("/messages/:id", async (req, res) => {
    try {
      const allowedFields = [
        "fullName",
        "email",
        "company",
        "role",
        "phoneCountryIso",
        "phoneCountryCode",
        "phone",
        "subjectCategory",
        "subjectKey",
        "subject",
        "subjectSpecificDetails",
        "message",
        "pageUrl",
        "referrer",
        "elapsedMs",
        "botSuspected",
      ]

      const fields = []
      const values = []

      for (const key of allowedFields) {
        if (!(key in req.body)) continue

        fields.push(`${key} = ?`)
        values.push(
          key === "subjectSpecificDetails"
            ? JSON.stringify(normalizeDetails(req.body[key]))
            : key === "phone"
              ? normalizePhoneNumber(req.body.phoneCountryCode, req.body[key])
              : key === "phoneCountryIso"
                ? toNullableString(req.body[key])?.toUpperCase() ?? null
                : key === "botSuspected"
                  ? toBoolean(req.body[key])
                  : key === "elapsedMs"
                    ? (Number.isFinite(Number(req.body[key])) ? Number(req.body[key]) : null)
                    : toNullableString(req.body[key])
        )
      }

      if (fields.length === 0) {
        return res.status(400).json({ status: "error", message: "No fields to update" })
      }

      await client.Database.query(
        `UPDATE contact_messages SET ${fields.join(", ")} WHERE id = ?`,
        [...values, req.params.id]
      )

      return res.json({ status: "success" })
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message })
    }
  })

  /**
   * 📌 5. Mesaj sil (admin)
   * DELETE /v1/contact/messages/:id
   */
  router.delete("/messages/:id", async (req, res) => {
    try {
      await client.Database.query("DELETE FROM contact_messages WHERE id = ?", [req.params.id])
      return res.json({ status: "success" })
    } catch (err) {
      return res.status(500).json({ status: "error", message: err.message })
    }
  })

  app.use("/v1/contact", router)
}
