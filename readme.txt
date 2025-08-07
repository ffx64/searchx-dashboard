===========================================================================================
                                  SearchX Dashboard                                    
===========================================================================================

SearchX Dashboard is the official web interface for visualizing and managing data
indexed by the SearchX system. Built with Next.js, TailwindCSS, and ShadCN UI, it
provides real-time interaction with agents, credentials, and other relevant data.

This project is intended **strictly for educational and research purposes**.
Usage for unauthorized or illegal activities is **prohibited**.

-------------------------------------------------------------------------------------------
                                      Features                                          
-------------------------------------------------------------------------------------------

- Modern UI built with Next.js 14 (App Router)
- REST integration with the SearchX API
- Real-time dashboard for agents, statistics, and collected data
- Reusable components with ShadCN UI and TailwindCSS
- toast notifications, modals, and dialogs

-------------------------------------------------------------------------------------------
                                      Screenshot                                          
-------------------------------------------------------------------------------------------

Note: All data contained in the screenshots are fictitious.

1. https://i.imgur.com/ndvXCKP.png - Applications Running
2. https://i.imgur.com/cAJgoo4.png - Command Center
3. https://i.imgur.com/eJzHG8g.png - Report Center
4. https://i.imgur.com/I1U09oh.png - Agent Network
5. https://i.imgur.com/wTGABLj.png - Agent Auth Key Generator
6. https://i.imgur.com/URT3DMW.png - Combolist Module

-------------------------------------------------------------------------------------------
                                     Prerequisites                                        
-------------------------------------------------------------------------------------------

- Node.js 18+
- pnpm / npm / yarn / bun
- SearchX API running locally or remotely (https://github.com/ffx64/searchx-api)

-------------------------------------------------------------------------------------------
                                    Getting Started                                    
-------------------------------------------------------------------------------------------

1. Clone the repo:
   git clone https://github.com/ffx64/searchx-dashboard

2. Install dependencies:
   npm install

3. Configure your API endpoint in `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
   ```

4. Run the damn thing:
   npm dev

5. Open it in your browser:
   http://localhost:3000

-------------------------------------------------------------------------------------------
                                       Project Structure                                  
-------------------------------------------------------------------------------------------

searchx-dashboard/
├── app/                          <- App Router pages and routes
│   ├── _agent-network/           <- Agent network visualization
│   ├── _command-center/          <- Command & control
│   ├── _dashboard/               <- Main dashboard
│   ├── _login/                   <- Login page
│   ├── _operations/              <- Active operations
│   ├── _report/                  <- Reports & audits
│   ├── _systems/                 <- Monitored systems
│   ├── favicon.ico               <- App icon
│   ├── globals.css               <- Global styles
│   ├── layout.tsx                <- Root layout
│   └── page.tsx                  <- Root page
│
├── components/                  <- Reusable UI components
│   ├── layout/                  <- Layout components
│   ├── site/                    <- General site pieces
│   └── ui/                      <- ShadCN-style buttons, inputs, etc
│
├── hooks/                       <- Custom React hooks
│   ├── use-mobile.tsx           <- Check for mobile screen size
│   └── useAuthGuard.ts          <- Auth route protection
│
├── lib/                         <- Helper stuff
│   ├── api.ts                   <- API calls setup
│   └── utils.ts                 <- Random utilities
│
├── services/                    <- API service layer
│   ├── agents.service.ts
│   ├── auth.service.ts
│   └── combolist.service.ts
│
├── types/                       <- TypeScript types
│   ├── agents.type.ts
│   ├── auth.type.ts
│   ├── combolist.type.ts
│   ├── exception.type.ts
│   └── user.type.ts
│
└── .gitignore                   <- Stuff Git should ignore

-------------------------------------------------------------------------------------------
                                       Core UI Routes                                     
-------------------------------------------------------------------------------------------

/_dashboard                -> General agents dashboard
/_agent-network            -> Agent network map
/_command-center           -> Central control panel
/_operations               -> Running ops
/_systems                  -> Infra targets & systems
/_report                   -> Breach and data leak reports
/_login                    -> Login screen

-------------------------------------------------------------------------------------------
                                          Notes                                           
-------------------------------------------------------------------------------------------

- Part of the SearchX ecosystem (includes API, indexer, and dashboard)
- Contributions and improvements are welcome
