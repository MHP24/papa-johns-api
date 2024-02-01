# Papa Johns API
<p align="center">
  <a href="https://papa-johns-api.mg-hp.com/api/v1/docs" target="_blank"><img src="./papa-johns-logo.png" width="200" alt="Papa Johns logo" style="border-radius: 20%" /></a>

  <div align="center">
    <img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" width="30" height="30"/>
    <img src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/519bfaf3-c242-431e-a269-876979f05574" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" width="30" height="30">
    <img src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" width="30" height="30">
    <img src="https://user-images.githubusercontent.com/25181517/187955008-981340e6-b4cc-441b-80cf-7a5e94d29e7e.png" width="30" height="30"/>
  </div>
  
</p>

## 1. Installation

Before running the server, ensure you have [Node.js](https://nodejs.org/en) installed (version 18 or higher) and [Docker](https://www.docker.com/) installed and running.


 1 . Install dependencies using Yarn:
```bash
  yarn
```

 2 . Replace .env.template variables and rename it as __.env file__

 3 . Generate Prisma client:
```bash
  yarn prisma:generate
```

 4 . Start Docker in the server directory:
```bash
  docker compose -f docker-compose.dev.yml up -d
```

 5 . Run database migrations with Prisma:
```bash
  yarn prisma:migrate
```

 6 . Start the development server:
```bash
  yarn start:dev
```

## 2. Specification

Details are available on:
http://your-domain-port/api/v1/docs