# 🛡️ CyberGuard SOC

CyberGuard SOC is a modern **Security Operations Center (SOC) dashboard** designed to monitor, analyze, and manage cybersecurity threats from a centralized interface.

The platform provides security alerts, threat intelligence, incident management, IP analysis, system health monitoring, threat analytics, and real-time threat visualization.

---

## 🚀 Features

### 📊 Security Dashboard

* Security overview dashboard
* Critical threat statistics
* Active alerts monitoring
* Incident statistics
* AI detection statistics
* Protected endpoint monitoring
* System health overview

### 🚨 Security Alerts

* View detected security alerts
* Search alerts by IP address
* Filter alerts by severity
* Threat score visualization
* Alert detail modal
* Create security incidents directly from alerts

### 🧠 Threat Intelligence

* Threat intelligence monitoring
* Malware feed
* Suspicious IP information
* Threat indicators
* Threat severity classification

### 🌍 Threat Monitoring

* Interactive attack map
* Threat location visualization
* Security event monitoring
* Live threat feed

### 🔎 IP Security Checker

* IP address analysis
* Threat checking
* Security information display

### 📈 Threat Analytics

* Threat statistics
* Security activity visualization
* Threat trends
* Historical threat analysis

### 💻 System Health Monitor

* CPU status
* Memory status
* Database connection status
* API service status
* Application uptime
* Real-time health monitoring

### 📁 Incident Management

* Create incidents from security alerts
* View incident details
* Track security incidents

---

## 🛠️ Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React
* Recharts

### Backend

* Next.js API Routes
* Node.js
* MongoDB
* Mongoose

### Security & Visualization

* Threat Intelligence APIs
* IP Analysis
* Interactive Threat Maps
* Real-time Security Monitoring

---

## 📂 Project Structure

```text
cyberguard-soc/
│
├── app/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── alerts/
│   │   ├── incidents/
│   │   ├── threat-intelligence/
│   │   └── threat-monitor/
│   │
│   └── api/
│       └── security/
│
├── components/
│   ├── dashboard/
│   │   ├── stats-card.tsx
│   │   ├── threat-chart.tsx
│   │   ├── recent-alerts.tsx
│   │   ├── ai-summary.tsx
│   │   ├── health-card.tsx
│   │   ├── live-threat-feed.tsx
│   │   ├── threat-analytics.tsx
│   │   ├── threat-scan-history.tsx
│   │   └── attack-map.tsx
│   │
│   ├── security/
│   │   ├── ip-checker.tsx
│   │   └── ...
│   │
│   └── threat-monitor/
│       ├── GlobeScene.tsx
│       ├── GlobeContainer.tsx
│       └── ...
│
├── models/
│   ├── Alert.ts
│   ├── Incident.ts
│   └── ...
│
├── public/
│   └── textures/
│
├── lib/
│   └── mongodb.ts
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Go to the project directory:

```bash
cd cyberguard-soc
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any additional API keys required by your Threat Intelligence services.

> Never commit `.env.local` or other files containing secrets to GitHub.

---

## ▶️ Run the Development Server

Start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 🔄 Development Workflow

The project follows a modular architecture where:

```text
Security Events
       ↓
API Layer
       ↓
MongoDB
       ↓
Security Dashboard
       ↓
Alerts / Analytics / Incidents
```

Security alerts can be analyzed and converted into incidents for further investigation.

---

## 📊 Main Modules

| Module              | Description                     |
| ------------------- | ------------------------------- |
| Dashboard           | Overall SOC security overview   |
| Alerts              | Security alert monitoring       |
| Incidents           | Security incident management    |
| Threat Intelligence | Threat and malware intelligence |
| Threat Monitor      | Global threat visualization     |
| IP Checker          | IP security analysis            |
| Threat Analytics    | Threat statistics and trends    |
| Live Feed           | Real-time security events       |
| System Health       | Application health monitoring   |
| Scan History        | Previous security scans         |

---

## 🎨 UI Design

CyberGuard SOC uses a modern dark SOC interface with:

* Dark security-focused theme
* Glassmorphism UI
* Cyan / blue / purple accents
* Animated security indicators
* Responsive layouts
* Interactive charts
* Real-time status indicators
* Threat severity visualization

The interface is designed for both **desktop and responsive web environments**.

---

## 🧪 Error Handling

The application includes handling for:

* API failures
* Database connection failures
* Invalid security data
* Empty alert results
* Failed incident creation
* Loading states
* Client-side hydration issues
* Responsive rendering

---

## 🔒 Security Notes

For production deployment:

* Use strong JWT secrets
* Protect API routes
* Validate all incoming data
* Keep API keys in environment variables
* Never expose database credentials
* Enable proper authentication and authorization
* Use HTTPS
* Apply rate limiting to security APIs
* Sanitize user input
* Monitor application logs

---

## 🚀 Future Improvements

Planned improvements include:

* Advanced threat intelligence integration
* Automated threat correlation
* AI-powered threat analysis
* Real-time WebSocket threat events
* Advanced incident investigation
* User and role management
* Security event notifications
* Email / Slack security alerts
* Advanced SOC reporting
* SIEM integration
* Automated threat response

---

## 👨‍💻 Development

CyberGuard SOC is developed as a modular cybersecurity monitoring platform with a focus on:

* Security monitoring
* Threat detection
* Incident response
* Threat intelligence
* Data visualization
* Modern SOC user experience

---

## 📄 License

This project is intended for educational, development, and authorized security monitoring purposes.

Do not use this platform to access, monitor, or analyze systems without proper authorization.

---

## ⭐ Project

**CyberGuard SOC — Security Operations Center Dashboard**

> Monitor. Detect. Analyze. Respond.
