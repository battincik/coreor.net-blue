/*
  # Careers System Tables

  ## New Tables
  
  1. `job_positions`
     - `id` (uuid, primary key)
     - `title` (text) - Job title
     - `department` (text) - Engineering, Design, Sales, etc.
     - `location` (text) - Remote, Istanbul, etc.
     - `type` (text) - Full-time, Part-time, Contract
     - `salary_range` (text, nullable) - Optional salary range
     - `description` (text) - Full job description
     - `requirements` (text[]) - List of requirements
     - `is_active` (boolean) - Whether position is open
     - `created_at` (timestamptz)
  
  2. `job_applications`
     - `id` (uuid, primary key)
     - `position_id` (uuid, FK to job_positions, nullable)
     - `position_title` (text) - Stored for reference
     - `first_name` (text)
     - `last_name` (text)
     - `email` (text)
     - `phone` (text, nullable)
     - `experience_years` (integer)
     - `applicant_role` (text, nullable) - applicant's current job title
     - `linkedin_url` (text, nullable)
     - `portfolio_url` (text, nullable)
     - `cover_letter` (text)
     - `how_did_you_hear` (text, nullable)
     - `status` (text) - pending, reviewing, interview, offer, rejected
     - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - job_positions: public can SELECT only active positions
  - job_applications: public can INSERT only (no public read)
  - Validates required fields on insert via WITH CHECK

  ## Seeded Data
  - 6 initial open job positions across departments
*/

-- Job positions table
CREATE TABLE IF NOT EXISTS job_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL DEFAULT 'Remote',
  type text NOT NULL DEFAULT 'Full-time',
  salary_range text,
  description text NOT NULL,
  requirements text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position_id uuid REFERENCES job_positions(id),
  position_title text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  experience_years integer NOT NULL DEFAULT 0,
  applicant_role text,
  linkedin_url text,
  portfolio_url text,
  cover_letter text NOT NULL,
  how_did_you_hear text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE job_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- job_positions: anyone can read active positions
CREATE POLICY "Public can view active job positions"
  ON job_positions FOR SELECT
  USING (is_active = true);

-- job_applications: anyone can submit (validated required fields)
CREATE POLICY "Anyone can submit a job application"
  ON job_applications FOR INSERT
  WITH CHECK (
    email IS NOT NULL
    AND first_name IS NOT NULL
    AND last_name IS NOT NULL
    AND cover_letter IS NOT NULL
    AND length(email) > 3
    AND length(cover_letter) > 10
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_job_positions_active ON job_positions(is_active);
CREATE INDEX IF NOT EXISTS idx_job_applications_position ON job_applications(position_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(email);

-- Seed initial job positions
INSERT INTO job_positions (title, department, location, type, salary_range, description, requirements) VALUES
(
  'Senior Full-Stack Developer',
  'Engineering',
  'Remote / Istanbul',
  'Full-time',
  '$80,000 - $120,000',
  'We are looking for a Senior Full-Stack Developer to join our core engineering team. You will architect and build scalable web applications for our enterprise clients across fintech, healthcare, and e-commerce verticals. You will collaborate closely with designers, product managers, and client stakeholders to deliver exceptional digital experiences.',
  ARRAY[
    '5+ years of experience with React, Node.js, or similar stack',
    'Strong understanding of REST APIs and GraphQL',
    'Experience with cloud platforms (AWS, GCP, or Azure)',
    'Proficiency in TypeScript and modern JavaScript',
    'Experience with PostgreSQL or similar databases',
    'Familiarity with CI/CD pipelines and DevOps practices',
    'Strong communication skills in English'
  ]
),
(
  'DevOps & Cloud Infrastructure Engineer',
  'Infrastructure',
  'Remote / Istanbul',
  'Full-time',
  '$75,000 - $110,000',
  'Join our infrastructure team to design, build, and maintain cloud systems that power hundreds of client applications. You will be responsible for our hosting platform, server management, and ensuring 99.9% uptime SLA for all client environments. This is a critical role with high impact and visibility.',
  ARRAY[
    '3+ years of DevOps or SRE experience',
    'Deep expertise in Kubernetes and Docker',
    'Experience with Terraform or Pulumi (Infrastructure as Code)',
    'Strong Linux administration skills',
    'Experience with monitoring tools (Prometheus, Grafana, etc.)',
    'Knowledge of networking, DNS, and SSL/TLS management',
    'AWS/GCP certification preferred'
  ]
),
(
  'UI/UX Designer',
  'Design',
  'Remote',
  'Full-time',
  '$55,000 - $85,000',
  'We are seeking a talented UI/UX Designer who can translate complex business requirements into intuitive, beautiful digital products. You will own the design process from discovery and research through to high-fidelity prototypes and design systems. Your work will be used by millions of end users across our client portfolio.',
  ARRAY[
    '3+ years of product design experience',
    'Expert-level proficiency in Figma',
    'Strong portfolio demonstrating end-to-end design work',
    'Experience with design systems and component libraries',
    'Understanding of accessibility (WCAG) guidelines',
    'Basic knowledge of HTML/CSS is a plus',
    'Experience with user research and usability testing'
  ]
),
(
  'Backend Engineer (Go/Python)',
  'Engineering',
  'Remote / Istanbul',
  'Full-time',
  '$70,000 - $105,000',
  'We need an experienced backend engineer to build high-performance, fault-tolerant APIs and microservices. You will work on server-side systems that handle thousands of requests per second, integrate with payment gateways, and process large datasets. Experience with financial or healthcare systems is a major plus.',
  ARRAY[
    '4+ years of backend development experience',
    'Proficiency in Go and/or Python',
    'Experience designing and building RESTful and gRPC APIs',
    'Strong knowledge of SQL and NoSQL databases',
    'Understanding of message queues (Kafka, RabbitMQ)',
    'Experience with microservices architecture',
    'Security-first development mindset'
  ]
),
(
  'Business Development Manager',
  'Sales',
  'Istanbul / Hybrid',
  'Full-time',
  '$60,000 - $90,000 + Commission',
  'Drive growth at Coreor by identifying new business opportunities, building client relationships, and closing deals. You will work with our technical team to scope projects, prepare proposals, and ensure clients understand the full value of our service offerings. This is a high-impact role reporting directly to the CEO.',
  ARRAY[
    '4+ years of B2B sales or business development experience',
    'Proven track record of meeting or exceeding sales targets',
    'Experience in the software/technology services sector preferred',
    'Excellent presentation and negotiation skills',
    'Fluency in both Turkish and English required',
    'Strong network in the Turkish and/or European tech ecosystem',
    'CRM experience (HubSpot, Salesforce)'
  ]
),
(
  'Junior Frontend Developer',
  'Engineering',
  'Istanbul / Hybrid',
  'Full-time',
  '$30,000 - $50,000',
  'A great opportunity for a talented junior developer to grow rapidly in a professional environment. You will work alongside senior engineers to build responsive web interfaces, learn best practices, and contribute to real client projects from day one. We invest heavily in mentorship and professional development.',
  ARRAY[
    '1+ years of experience with React or Vue.js',
    'Solid understanding of HTML, CSS, and JavaScript',
    'Familiarity with Git version control',
    'Basic understanding of REST APIs',
    'Eagerness to learn and grow professionally',
    'Computer Science degree or equivalent practical experience',
    'Portfolio or GitHub profile with sample projects'
  ]
)
ON CONFLICT DO NOTHING;
