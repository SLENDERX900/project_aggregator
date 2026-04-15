"# Project Aggregator

A portfolio showcase website that aggregates and displays GitHub projects with AI-powered descriptions.

**Live Site:** [https://project-aggregator.vercel.app](https://project-aggregator.vercel.app)

---

## Features

- **Automated Project Discovery**: Scans GitHub repositories and extracts key information
- **AI-Powered Descriptions**: Uses AI to generate compelling project summaries
- **Technology Filtering**: Filter projects by programming language/technology
- **Screenshot Gallery**: Displays project screenshots in an interactive gallery
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | CSS3 with CSS Variables |
| Deployment | Vercel |
| Data Processing | Python (Harvester & Refiner scripts) |

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/SLENDERX900/project_aggregator.git
cd project_aggregator

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:5173`

---

## Project Structure

```
project_aggregator/
├── frontend/           # React + Vite application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── vercel.json    # Vercel deployment config
├── scripts/           # Python data processing
│   ├── harvester.py   # GitHub repo scraper
│   ├── refiner.py     # AI description generator
│   └── cli_menu.py    # Interactive CLI
└── .gitignore         # Git exclusions
```

---

## Data Pipeline

1. **Harvest** (`harvester.py`): Fetches GitHub repository data
2. **Refine** (`refiner.py`): AI processes and enhances descriptions
3. **Build** (`npm run build`): Compiles React app
4. **Deploy**: Vercel auto-deploys on push to main

---

## Environment Variables

Create a `.env` file in the project root:

```env
GITHUB_TOKEN=your_github_personal_access_token
OPENAI_API_KEY=your_openai_api_key  # for refiner.py
```

**Note:** These are only used locally. For Vercel, add them in the dashboard.

---

## Deployment

This project is configured for **automatic deployment** via Vercel:

1. Push changes to `main` branch
2. Vercel detects the push
3. Build runs (`npm run build`)
4. Site updates automatically

---

## Scripts

### CLI Menu
```bash
cd scripts
python cli_menu.py
```

Interactive menu for:
- Harvesting new projects
- Refining descriptions
- Building for deployment

### Manual Harvest
```bash
cd scripts
python harvester.py
python refiner.py
cp portfolio_ready.json ../frontend/public/
```

---

## License

MIT License - feel free to use this template for your own portfolio!

---

**Built with** by [SLENDERX900](https://github.com/SLENDERX900)" 
