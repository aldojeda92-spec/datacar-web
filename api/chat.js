import { GoogleGenerativeAI } from '@google/generative-ai';


export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Solo se aceptan peticiones POST' });
    }

    try {
        const { message } = req.body;
        
        // 1. Limpiamos la llave de espacios invisibles con .trim()
        const apiKey = "AIzaSyAD0vE_hyPgXjDFnL2zdGMnljoBNvmDWLA".trim();
        
        // 2. Imprimimos un aviso en Vercel para saber que se actualizó el código
        console.log("Conectando a Gemini con llave limpia...");

        const genAI = new GoogleGenerativeAI(apiKey);
       const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const systemInstruction1 = `Sos el Asesor Experto en Gestión de Inversiones Automotrices de DATACAR. Tu misión es perfilar al cliente, brindar opciones de vehículos y capturar SIEMPRE su Nombre y Celular para derivarlo a un asesor humano. Basate en datos reales. Si no sabés algo, pedí sus datos para que un asesor especializado lo contacte.`;
// 📚 ACÁ EMPIEZA EL ENTRENAMIENTO (EL CEREBRO)
        const inventarioAutos = `
        ### BYD
- Sealion 7 2026 | SUV | USD 49900 | Motor: 390 kW / 690 Nm | AT | AWD
- Shark 2025 | Pickup | USD 44900 | AT
- Shark 2026 | Pickup | USD 50900 | AT
- Song Plus 2025 | SUV | USD 33900 | Motor: 1.5T | E-CVT | Delantera
- Song Plus 2026 | SUV | USD 37900 | Motor: 1.5T | E-CVT | Delantera
- Song Pro DM-i GL (2025) | SUV | USD 26900 | Motor: 1.5L / 78 kW / 135 Nm | DHT30 | Delantera
- Song Pro DM-i GL (2026) | SUV | USD 30900 | Motor: 1.5L / 78 kW / 135 Nm | DHT30 | Delantera
- Song Pro DM-i GS (2026) | SUV | USD 32900 | Motor: 1.5L / 78 kW / 135 Nm | DHT30 | Delantera
- Tang EV 2025 | SUV | USD 59900 | Motor: 380 kW / 700 Nm | AT | AWD
- Yuan Plus 2025 | SUV | USD 34900 | Motor: 150 kW / 310 Nm | AT | Delantera

### CHEVROLET
- Captiva Premier (2026) | SUV | USD 28990 | Motor: EV / 201 HP / 310 Nm | AT única vel. | 4x2
- Montana LTZ (2026) | Pickup | USD 21990 | Motor: 1.2T / 132 HP / 190 Nm | AT 6 marchas | 4x2
- Montana Premier (2026) | Pickup | USD 25500 | Motor: 1.2T / 132 HP / 190 Nm | AT 6 marchas | 4x2
- Montana RS (2026) | Pickup | USD 25990 | Motor: 1.2T / 132 HP / 190 Nm | AT 6 marchas | 4x2
- Onix LTZ (2025) | Hatchback | USD 16500 | Motor: 1.0T / 115 HP / 160 Nm | AT 6 | 4x2
- Onix RS (2025) | Hatchback | USD 16990 | Motor: 1.0T / 115 HP / 160 Nm | AT 6 | 4x2
- Onix Premier (2025) | Hatchback | USD 18500 | Motor: 1.0T / 115 HP / 160 Nm | AT 6 | 4x2
- Onix LT (2026) | Hatchback | USD 11990 | Motor: 1.0L / 80 HP / 100 Nm | MT 6 marchas | 4x2
- Onix LT (2026) | Hatchback | USD 13990 | Motor: 1.0T / 115 HP / 160 Nm | AT 6 marchas | 4x2
- Onix RS (2026) | Hatchback | USD 16990 | Motor: 1.0T / 115 HP / 160 Nm | AT 6 marchas | 4x2
- Onix Plus Premier (2025) | Sedan | USD 21990 | Motor: 1.0T / 115 HP / 160 Nm | AT 6 | 4x2
- Onix Plus LTZ (2026) | Sedan | USD 19990 | Motor: 1.0T / 115 HP / 160 Nm | AT 6 marchas | 4x2
- Onix Plus Premier (2026) | Sedan | USD 21990 | Motor: 1.0T / 115 HP / 160 Nm | AT 6 marchas | 4x2
- S10 High Country (2025) | Pickup | USD 49990 | Motor: 2.8 Turbodiésel / 204 HP / 510 Nm | AT 8 marchas | 4x4
- S10 Worktruck (2026) | Pickup | USD 33990 | Motor: 2.8 Turbodiésel / 204 HP / 510 Nm | MT 6 marchas | 4x4
- S10 Worktruck (2026) | Pickup | USD 34990 | Motor: 2.8 Turbodiésel / 204 HP / 510 Nm | MT 6 marchas | 4x4
- S10 Worktruck (2026) | Pickup | USD 38990 | Motor: 2.8 Turbodiésel / 204 HP / 510 Nm | AT 8 marchas | 4x4
- S10 Z71 (2026) | Pickup | USD 43990 | Motor: 2.8 Turbodiésel / 204 HP / 510 Nm | AT 8 marchas | 4x4
- S10 LTZ (2026) | Pickup | USD 47990 | Motor: 2.8 Turbodiésel / 204 HP / 510 Nm | AT 8 marchas | 4x4
- S10 High Country (2026) | Pickup | USD 50990 | Motor: 2.8 Turbodiésel / 204 HP / 510 Nm | AT 8 marchas | 4x4
- Silverado Z71 (2025) | Pickup | USD 78990 | Motor: 3.0TD / 305 HP / 671 Nm | AT 10 marchas | 4WD
- Spark Activ EV (2026) | Hatchback | USD 19990 | Motor: EV / 102 HP / 180 Nm | AT única vel. | 4x2
- Tracker RS (2025) | SUV | USD 24990 | Motor: 1.2T / 139 HP / 220 Nm | AT 6 marchas | 4x2
- Tracker Premier (2025) | SUV | USD 25500 | Motor: 1.2T / 139 HP / 220 Nm | AT 6 marchas | 4x2
- Tracker Lite (2026) | SUV | USD 18500 | Motor: 1.0T / 115 HP / 160 Nm | AT 6 marchas | 4x2
- Tracker LTZ (2026) | SUV | USD 21500 | Motor: 1.2T / 139 HP / 220 Nm | AT 6 marchas | 4x2
- Tracker RS (2026) | SUV | USD 24990 | Motor: 1.2T / 139 HP / 220 Nm | AT 6 marchas | 4x2
- Tracker Premier (2026) | SUV | USD 25500 | Motor: 1.2T / 139 HP / 220 Nm | AT 6 marchas | 4x2
- Trailblazer High Country (2026) | SUV | USD 45990 | Motor: 2.8 Turbodiésel / 204 HP / 510 Nm | AT 8 marchas | 4x4

### GEELY
- Azkarra Luxury | SUV | USD 23990 | Motor: 1.5cc / 177 HP / 265 Nm | Automático DCT 7 | 4x4
- Cityray Comfort (2026) | SUV | USD 23490 | Motor: 1.5T / 172 HP / 290 Nm | AT 7DCT | 4x2
- Cityray Luxury (2026) | SUV | USD 27490 | Motor: 1.5T / 172 HP / 290 Nm | AT 7DCT | 4x2
- Cityray Exclusive (2027) | SUV | USD 25490 | Motor: 1.5T / 172 HP / 290 Nm | AT 7DCT | 4x2
- Cityray Luxury (2027) | SUV | USD 28490 | Motor: 1.5T / 172 HP / 290 Nm | AT 7DCT | 4x2
- Coolray FL DCT AT GK (2027) | SUV | USD 20990 | Motor: 1.5cc / 171 HP / 290 Nm | Automático DCT 7 | Delantera
- Coolray FL DCT AT GF (2027) | SUV | USD 22990 | Motor: 1.5cc / 171 HP / 290 Nm | Automático DCT 7 | Delantera
- Coolray Lite Mecánico (2026) | SUV | USD 16500 | Motor: 1.5 / 125 HP / 152 Nm | MT 5 | 4x2
- Coolray Lite Automático (2026) | SUV | USD 17990 | Motor: 1.5 / 125 HP / 152 Nm | CVT | 4x2
- Coolray Lite Mecánico (2027) | SUV | USD 17500 | Motor: 1.5 / 125 HP / 152 Nm | MT 5 | 4x2
- Coolray Lite Automático (2027) | SUV | USD 18990 | Motor: 1.5 / 125 HP / 152 Nm | CVT | 4x2
- Coolray Pro Luxury (2024) | SUV | USD 20990 | Motor: 1.5T / 174 HP / 290 Nm | AT 7DCT | 4x2
- Coolray Pro Luxury (2025) | SUV | USD 21990 | Motor: 1.5T / 174 HP / 290 Nm | AT 7DCT | 4x2
- Emgrand GX3 PRO AT 1.5 Luxury (2025) | SUV | USD 14490 | Motor: 1.5cc / 103 HP / 143 Nm | Automático CVT | 4x2
- Emgrand GX3 PRO Comfort (2026) | SUV | USD 13990 | Motor: 1.5cc / 103 HP / 143 Nm | MT 5 | 4x2
- Emgrand GX3 PRO Luxury (2026) | SUV | USD 14990 | Motor: 1.5cc / 103 HP / 143 Nm | Automático CVT | 4x2
- Emgrand GX3 PRO Comfort (2027) | SUV | USD 14990 | Motor: 1.5cc / 103 HP / 143 Nm | MT 5 | 4x2
- Emgrand GX3 PRO AUT.GF (2027) | SUV | USD 16250 | Motor: 1.5cc / 103 HP / 143 Nm | Automático CVT | 4x2
- RIDDARA RD6 ESTANDAR | Pickup | USD 35990 | Motor: 63 kWh / 268 HP / 384 Nm | Automático | 4x2
- RIDDARA RD6 LUXURY | Pickup | USD 45990 | Motor: 86 kWh / 268 HP / 384 Nm | Automático | 4x2
- Riddara RD6 GL PHEV (2026) | Pickup | USD 36990 | Motor: 1.5T / 354 HP / 914 Nm | DHT | 4x4
- Riddara RD6 GLX 4WD | Pickup | USD 43000 | Motor: 1.5T / 354 HP / 914 Nm | DHT | 4WD
- Riddara RD6 GS 4WD | Pickup | USD 47000 | Motor: 1.5T / 354 HP / 914 Nm | DHT | 4WD
- Riddara RD6 PRO 4WD | Pickup | USD 49990 | Motor: 73 kWh / 422 HP / 595 Nm | Automático | 4WD
- Riddara RD6 ULTRA 4WD | Pickup | USD 55990 | Motor: 86 kWh / 422 HP / 595 Nm | Automático | 4WD
- Starray Exclusive | SUV | USD 28990 | Motor: 2.0L / 160 kW / 325 Nm | Automático DCT 7 | FWD
- Starray Exclusive (2026) | SUV | USD 29990 | Motor: 2.0L / 160 kW / 325 Nm | Automático DCT 7 | FWD
- Starray Luxury (2026) | SUV | USD 32990 | Motor: 2.0L / 160 kW / 325 Nm | Automático DCT 7 | FWD

### HONDA
- CR-V EX | SUV | USD 47000 | AT | 2WD
- CR-V EX Con Cuero y Llanta | SUV | USD 48500 | AT | 2WD
- CR-V EHEV | SUV | USD 56900 | Motor: 2.0L + Eléctrico / 147 HP + 184 HP / 19.4 kgfm + 34.2 kgfm | Automático | 4WD
- HR-V EX | SUV | USD 28500 | Motor: 1.5 i-VTEC / 126 HP / 15.5 kgfm | CVT | 2WD
- HR-V EXL | SUV | USD 30500 | Motor: 1.5 i-VTEC / 126 HP / 15.5 kgfm | CVT | 2WD
- HR-V TOURING | SUV | USD 35900 | Motor: 1.5 Turbo / 177 HP / 24.5 kgfm | CVT | 2WD
- PILOT ELITE | SUV | USD 84900 | Motor: V6 3.5 / 285 HP / 355 Nm | AT | 4WD
- WR-V EXL | SUV | USD 26900 | Motor: 1.5 i-VTEC / 125 HP / 152 Nm | CVT | 2WD

### HYUNDAI
- GRAND I10 HATCHBACK (2025) | Hatchback | USD 10990 | Motor: 1.0 MPI / 66 ps / 9.6 kgfm | MT | 4x2
- GRAND I10 SEDAN (2025) | Hatchback | USD 13990 | Motor: 1.2 MPI / 83 ps / 11.6 kgfm | Automático | 4x2
- GRAND I10 HATCHBACK (2026) | Hatchback | USD 10990 | Motor: 1.2 MPI / 83 ps / 11.6 kgfm | MT | 4x2
- GRAND I10 SEDAN (2026) | Hatchback | USD 12990 | Motor: 1.2 MPI / 83 ps / 11.6 kgfm | Automático | 4x2
- GRAND I10 SEDAN (2026) | Hatchback | USD 15990 | Motor: 1.2 MPI / 83 ps / 11.6 kgfm | Automático | 4x2
- H-100 PORTER CON A/A (2026) | Pickup | USD 19990 | Motor: 2.6cc / 80 cv / 167 Nm | MT | 4x2
- HB20 HATCHBACK (2024) | Hatchback | USD 11500 | Motor: 1.0cc / 80 CV / 10.2 Kg.m | MT | 4x2
- HB20 HATCHBACK (2025) | Hatchback | USD 11500 | Motor: 1.0cc / 80 CV / 10.2 Kg.m | MT | 4x2
- HB20 HATCHBACK (2026) | Hatchback | USD 12990 | Motor: 1.0cc / 80 CV / 10.2 Kg.m | MT | 4x2
- HB20 HATCHBACK (2026) | Hatchback | USD 14990 | Motor: 1.6cc / 123 CV / 15.5 Kg.m | Automático | 4x2
- HB20 SEDAN (2026) | Hatchback | USD 13990 | Motor: 1.6cc / 123 CV / 15.5 Kg.m | MT | 4x2
- HB20 HATCH (2027) | Hatchback | USD 13990 | Motor: 1.0cc / 80 CV / 10.2 Kg.m | MT | 4x2
- HB20 HATCH (2027) | Hatchback | USD 14990 | Motor: 1.6cc / 123 CV / 15.5 Kg.m | Automático | 4x2
- HB20 HATCH (2027) | Hatchback | USD 15490 | Motor: 1.6cc / 123 CV / 15.5 Kg.m | Automático | 4x2
- KONA GL (2023) | SUV | USD 35990 | Motor: 39.2kw | Automático | 4x2
- KONA GLS (2023) | SUV | USD 41990 | Motor: 64.0kw | Automático | 4x2
- KONA GLS (2026) | SUV | USD 29990 | Motor: 1.6 GDI / 141 ps / 264 nm | Automático | 4x2
- New Creta Comfort 2027 | SUV | USD 22500 | Motor: 1.5 Naftero / 115 ps / 14.7 kg.m | Automático | 4x2
- New Creta Platinum 2027 | SUV | USD 26990 | Motor: 1.5 Naftero / 115 ps / 14.7 kg.m | Automático | 4x2
- PALISADE GLS LIMITED 7 PAS (2025) | SUV | USD 58990 | Motor: 2.2cc | Automático | 4x4
- PALISADE LIMITED 8 Pas (2026) | SUV | USD 62990 | Motor: 2.2cc | Automático | 4x4
- PALISADE LIMITED 8 Pas (2026) | SUV | USD 62990 | Motor: 2.5 T-GDI HEV / 330 hp | Automático | 4x4
- PALISADE CALLIGRAPHY 8 Pas (2026) | SUV | USD 67990 | Motor: 2.5 T-GDI HEV / 330 hp | Automático | 4x4
- PORTER HR 2.6 D/ CABINA TRUCK (2026) | Pickup | USD 33000 | Motor: 2.6cc / 80 cv / 167 Nm | MT | 4x2
- SANTA FE GLS 7PAS (2025) | SUV | USD 45990 | Motor: 2.5 GDI / 194 ps / 25.1 kgf.m | Automático | 4x2
- SANTA FE GLS 7PAS (2025) | SUV | USD 49990 | Motor: 2.5 GDI / 194 ps / 25.1 kgf.m | Automático | 4x4
- SANTA FE 7PAS (2025) | SUV | USD 57990 | Motor: 1.6 T-GDI HEV / 235 ps / 37.4 Kgf.m | Automático | 4x4
- STARGAZER ST (2025) | SUV/MPV | USD 18990 | Motor: 1.5 MPI / 115 ps / 14.7 kg.m | Automático | 4x2
- STARIA FURGON (2025) | Furgón/MPV | USD 35500 | Motor: 2.2 TCI Diésel | MT | 4x2
- STARIA 9 PAS (2026) | Furgón/MPV | USD 48990 | Motor: 2.2 TCI Diésel | Automático | 4x2
- TUCSON GL SEMIFULL (2025) | SUV | USD 34990 | Motor: 2.0 CRDI / 186 ps / 42.5 kg.m | Automático | 4x2
- TUCSON GLS (2025) | SUV | USD 38990 | Motor: 2.0 CRDI / 186 ps / 42.5 kg.m | Automático | 4x2
- TUCSON GL (2026) | SUV | USD 29990 | Motor: 2.0 Naftero / 156 ps / 19.6 kg.m | Automático | 4x2
- TUCSON GL (2026) | SUV | USD 35990 | Motor: 2.0 CRDI / 186 ps / 42.5 kg.m | Automático | 4x2
- TUCSON GLS (2026) | SUV | USD 39990 | Motor: 2.0 CRDI / 186 ps / 42.5 kg.m | Automático | 4x2
- TUCSON LIMITED (2026) | SUV | USD 43990 | Motor: 2.0 CRDI / 186 ps / 42.5 kg.m | Automático | 4x2
- TUCSON GLS FULL (2026) | SUV | USD 35990 | Motor: 1.6 Turbo HEV / 230 ps / 37.4 kg.m | Automático | 4x2
- TUCSON LIMITED (2026) | SUV | USD 39990 | Motor: 1.6 Turbo HEV / 230 ps / 37.4 kg.m | Automático | 4x2
- VENUE GL (2026) | SUV | USD 17990 | Motor: 1.6cc / 123 ps / 15.4 kg.m | MT | 4x2
- VENUE GLS (2026) | SUV | USD 19990 | Motor: 1.6cc / 123 ps / 15.4 kg.m | Automático | 4x2

### ISUZU
- D-MAX LUJO SPORT (2025) | Pickup | USD 49990 | Motor: 3.0cc / 188 HP / 450 Nm | AT 6a | 4x4
- D-MAX STD PLUS (2026) | Pickup | USD 33990 | Motor: 1.9cc / 148 HP / 350 Nm | MT 6a | 4x4
- D-MAX STD PLUS (2026) | Pickup | USD 34990 | Motor: 1.9cc / 148 HP / 350 Nm | MT 6a | 4x4
- D-MAX SEMIFULL (2026) | Pickup | USD 35990 | Motor: 1.9cc / 148 HP / 350 Nm | MT 6a | 4x4
- D-MAX SEMI FULL (2026) | Pickup | USD 37990 | Motor: 1.9cc / 148 HP / 350 Nm | MT 6a | 4x4
- D-MAX FULL (2026) | Pickup | USD 41990 | Motor: 1.9cc / 148 HP / 350 Nm | AT 6a | 4x4
- D-MAX FULL (2026) | Pickup | USD 43990 | Motor: 3.0cc / 188 HP / 450 Nm | AT 6a | 4x4
- D-MAX SEMIFULL (2026) | Pickup | USD 42990 | Motor: 3.0cc / 188 HP / 450 Nm | MT 6a | 4x4
- D-MAX LUJO SPORT (2026) | Pickup | USD 50990 | Motor: 3.0cc / 188 HP / 450 Nm | AT 6a | 4x4
- D-MAX BLADE (2026) | Pickup | USD 58990 | Motor: 3.0cc / 238 HP / 657 Nm | AT 6a | 4x4
- MU-X STD (2026) | SUV | USD 45990 | Motor: 1.9cc / 148 HP / 350 Nm | AT 6a | 4x4
- MU-X SEMIFULL (2026) | SUV | USD 54990 | Motor: 3.0cc / 188 HP / 450 Nm | AT 6a | 4x4
- MU-X LUJO PESS (2026) | SUV | USD 59990 | Motor: 3.0cc / 188 HP / 450 Nm | AT 6a | 4x4

### JEEP
- Commander Overland (2025) | SUV | USD 41990 | Motor: 1.3T / 185 HP / 270 Nm | AT 6 | 4x2
- Commander Limited (2026) | SUV | USD 37990 | Motor: 1.3T / 185 HP / 270 Nm | AT 6 | 4x2
- Commander Overland (2026) | SUV | USD 48990 | Motor: 2.2 D / 200 HP / 450 Nm | AT 9 | 4x4
- Commander Blackhawk (2026) | SUV | USD 51990 | Motor: 2.0 G / 272 HP / 400 Nm | AT 9 | 4x4
- Compass Sport (2026) | SUV | USD 28500 | Motor: 1.3T | AT 6 | 4x2
- Compass Sport con Techo (2026) | SUV | USD 29990 | Motor: 1.3T | AT 6 | 4x2
- Compass Blackhawk (2026) | SUV | USD 42000 | Motor: 2.0 G | AT 9 | 4x4
- Renegade Altitude (2026) | SUV | USD 21990 | Motor: 1.3T / 185 HP | AT 6 | 4x2
- Renegade Longitude (2026) | SUV | USD 24990 | Motor: 1.3T / 185 HP | AT 6 | 4x2
- Wrangler Rubicon 4P (2026) | SUV | USD 86990 | Motor: 2.0L Turbo / 272 HP / 295 lb-ft | Automático 8AT | 4x4

### JETOUR
- DASHING GL | SUV | USD 20490 | Motor: 1.5T / 156 HP / 230 Nm | Automático DCT
- DASHING GLS | SUV | USD 24490 | Motor: 1.5T / 156 HP / 230 Nm | Automático DCT
- G700 Luxury | SUV | USD 49990 | AT
- G700 Exclusive | SUV | USD 59990 | AT
- T1 Confort | SUV | USD 28990 | Motor: 1.5T / 181 HP | Automático DCT
- T1 XWD | SUV | USD 32990 | Motor: 2.0T / 251 HP | Automático | XWD
- T1 PHEV | SUV | USD 34990 | Motor: 1.5T | AT
- T2 LUX | SUV | USD 35990 | Motor: 2.0T / 251 HP / 390 Nm | AT 7DCT | XWD
- T2 PHEV | SUV | USD 39990 | Motor: 1.5T | DHT
- X50 MT 1.5L (sin turbo) | SUV | USD 14990 | Motor: 1.5L / 114 HP / 143 Nm | MT | FWD
- X50 AT 1.5T | SUV | USD 16740 | Motor: 1.5T / 153 HP / 230 Nm | Automático DCT | FWD
- X70 GL FL BASIC | SUV | USD 16740 | Motor: 1.5T / 147 HP / 210 Nm | MT
- X70 GLS FL | SUV | USD 20490 | Motor: 1.5T / 147 HP / 210 Nm | Automático AT
- X70 PLUS GLS | SUV | USD 24490 | Motor: 1.5T / 156 HP / 230 Nm | Automático DCT

### KGM SSANGYONG
- KORANDO LIMITED (2025) | SUV | USD 28500 | Motor: 1.497cc / 163 HP / 280 Nm | AT 6 marchas | 4x2
- KORANDO DELUXE (2026) | SUV | USD 25990 | Motor: 1.497cc / 163 HP / 280 Nm | AT 6 marchas | 4x2
- MUSSO GRAND DELUXE (2025) | Pickup | USD 40900 | Motor: 2.157cc / 202 HP / 441 Nm | AT 6 marchas | 4x4
- MUSSO GRAND LIMITED (2025) | Pickup | USD 47990 | Motor: 2.157cc / 202 HP / 441 Nm | AT 6 marchas | 4x4
- REXTON DELUXE (2025) | SUV | USD 44990 | Motor: 2.157cc / 202 HP / 441 Nm | AT 8 marchas | 4x2
- REXTON LIMITED (2025) | SUV | USD 49000 | Motor: 2.157cc / 202 HP / 441 Nm | AT 8 marchas | 4x2
- REXTON LIMITED (2025) | SUV | USD 55400 | Motor: 2.157cc / 202 HP / 441 Nm | AT 8 marchas | 4x4
- REXTON LIMITED (2026) | SUV | USD 51000 | Motor: 2.157cc / 202 HP / 441 Nm | AT 8 marchas | 4x2
- TIVOLI DELUXE (2025) | SUV | USD 22500 | Motor: 1.497cc / 163 HP / 260 Nm | AT 6 marchas | 4x2
- TIVOLI DELUXE (2027) | SUV | USD 18500 | Motor: 1.497cc / 163 HP / 260 Nm | AT 6 marchas | 4x2
- TIVOLI LIMITED (2027) | SUV | USD 21990 | Motor: 1.497cc / 163 HP / 260 Nm | AT 6 marchas | 4x2
- TIVOLI XLV DELUXE (2024) | SUV | USD 17990 | Motor: 1.597cc / 128 HP / 160 Nm | AT 6 marchas | 4x2
- TORRES DELUXE (2025) | SUV | USD 27990 | Motor: 1.497cc / 160 HP / 280 Nm | AT 6 marchas | 4x2
- TORRES DELUXE + (2025) | SUV | USD 30990 | Motor: 1.497cc / 160 HP / 280 Nm | AT 6 marchas | 4x2
- TORRES LIMITED (2025) | SUV | USD 32990 | Motor: 1.497cc / 160 HP / 280 Nm | AT 6 marchas | 4x2
- TORRES LIMITED+ (2025) | SUV | USD 33990 | Motor: 1.497cc / 160 HP / 280 Nm | AT 6 marchas | 4x2
- TORRES DELUXE HYBRID (2026) | SUV | USD 33990 | Motor: 1.497cc / 160 HP / 280 Nm | AT 6 marchas | 4x2
- TORRES LIMITED HYBRID (2026) | SUV | USD 38990 | Motor: 1.497cc / 160 HP / 280 Nm | AT 6 marchas | 4x2

### KIA
- Carnival EX Limited | SUV/MPV | USD 56990 | Motor: 1.6T / 242 HP / 328 Nm | AT 6 | 4x2
- Carnival EX Ejecutivo | SUV/MPV | USD 60990 | Motor: 1.6T / 242 HP / 328 Nm | AT 6 | 4x2
- Ev5 LIGHT | SUV | USD 39990 | Automático | 4x2
- Ev5 WIND | SUV | USD 50990 | Automático | 4x2
- Ev5 WAVE | SUV | USD 58990 | Automático | 4x4
- Ev9 GT Line | SUV | USD 79990 | Motor: EV / 380 HP / 700 Nm | AT | 4x4
- K2700 CS S/AA | Pickup | USD 18500 | Motor: 2.7 / 80 HP / - | MT 5 vel. | 4x2
- K2700 CS C/AA | Pickup | USD 19990 | Motor: 2.7 / 80 HP / - | MT 5 vel. | 4x2
- K2700 CS Dual C/AA | Pickup | USD 20990 | Motor: 2.7 / 80 HP / - | MT 5 vel. | 4x2
- K2700 DC C/AA | Pickup | USD 24500 | Motor: 2.7 / 80 HP / - | MT 5 vel. | 4x4
- K3-cross EX | SUV | USD 19990 | Motor: 1.4 / 98 HP / - | AT 6 vel. | 4x2
- K3-cross GT Line | SUV | USD 26990 | Motor: 1.6 / 121 HP / - | AT 6 vel. | 4x2
- K3-sedan LX | Sedan | USD 17990 | Motor: 1.4 / 98 HP / - | MT 6 vel. | 4x2
- K3-sedan GT-Line | Sedan | USD 26990 | Motor: 1.4 / 98 HP / - | AT 6 vel. | 4x2
- K3-sedan EX | Sedan | USD 23990 | Motor: 1.4 / 98 HP / - | AT 6 vel. | 4x2
- Picanto LX | Hatchback | USD 10500 | Motor: 1.0 / 74 HP / - | MT 5 vel. | 4x2
- Picanto LX | Hatchback | USD 13500 | Motor: 1.0 / 74 HP / - | AT 4 vel. | 4x2
- Picanto EX | Hatchback | USD 14990 | Motor: 1.0 / 74 HP / - | AT 4 vel. | 4x2
- Seltos EX | SUV | USD 20990 | Motor: 1.5 / 113 HP / - | MT 6 vel. | 4x2
- Seltos EX | SUV | USD 23990 | Motor: 1.5 / 113 HP / - | AT 6 vel. | 4x2
- Seltos EX Full | SUV | USD 27500 | Motor: 1.5 / 113 HP / - | AT 6 vel. | 4x2
- Soluto LX | Sedan | USD 11990 | Motor: 1.4 / 95 HP / - | MT 5 vel. | 4x2
- Soluto LX | Sedan | USD 13500 | Motor: 1.4 / 95 HP / - | AT 4 vel. | 4x2
- Sonet EX Limited | SUV | USD 23990 | Motor: 1.5 / 115 HP / - | AT 6 vel. | 4x2
- Sorento EX Semi Full | SUV | USD 41990 | Motor: 1.6 | Automático | 4x2
- Sorento EX Full | SUV | USD 49500 | Motor: 1.6 | Automático | 4x2
- Tasman LX | Pickup | USD 39990 | Motor: 2.2 / 210 HP / 440 Nm | AT 8 | 4x2
- Tasman LX | Pickup | USD 47990 | Motor: 2.2 / 210 HP / 440 Nm | AT 8 | 4x4
- Tasman X-LINE | Pickup | USD 55990 | Motor: 2.2 / 210 HP / 440 Nm | AT 8 | 4x4
- Tasman X-PRO | Pickup | USD 59990 | Motor: 2.2 / 210 HP / 440 Nm | AT 8 | 4x4
- Tasman X-LINE | Pickup | USD 55990 | Motor: 2.5 / 280 HP / 422 Nm | AT 8 | 4x4
- Tasman X-PRO | Pickup | USD 59990 | Motor: 2.5 / 280 HP / 422 Nm | AT 8 | 4x4

### LYNK & CO
- 01 HYPER PRO (2025) | SUV | USD 31500 | Automático | 4x2
- 03+ 2025 | Sedan | USD 43990 | Motor: Drive-E 2.0TD / 265 HP / 380 Nm | Automático 8AT | 4WD
- 06 HALO PHEV (2025) | SUV | USD 27500 | Motor: 1.5L / 118 kW | Automático 3DHT Evo | Delantera
- 06 MAX PHEV (2025) | SUV | USD 25500 | Motor: 1.5L / 118 kW | Automático 3DHT Evo | Delantera
- 09 HALO 2026 | SUV | USD 59990 | Motor: 2.0TD / 254 HP / 350 Nm | Automático 8AT | AWD
- 09 PRO 2025 | SUV | USD 53490 | Motor: 2.0TD / 254 HP / 350 Nm | Automático 8AT | AWD
- 09 PRO 2026 | SUV | USD 54990 | Motor: 2.0TD / 254 HP / 350 Nm | Automático 8AT | AWD
- 09 ULTRA 2026 | SUV | USD 64990 | Motor: 2.0TD / 254 HP / 350 Nm | Automático 8AT | AWD

### MAHINDRA
- 3X0 Confort MT 26 | SUV | USD 12990 | Motor: 1.2L Turbo / 110 HP / 200 Nm | MT 6 | 2WD
- 3X0 Confort AT 26 | SUV | USD 16990 | Motor: 1.2L Turbo / 110 HP / 200 Nm | AT 6 | 2WD
- 3X0 Elite 26 | SUV | USD 17990 | Motor: 1.2L Turbo / 110 HP / 200 Nm | AT 6 | 2WD
- 3X0 Luxury 26 | SUV | USD 20990 | Motor: 1.2L Turbo / 110 HP / 200 Nm | AT 6 | 2WD
- S11 DC Full | Pickup | USD 27990 | Motor: 2.2L mHawk / 140 HP / 320 Nm | AT 6 | 4WD
- S6 DC Semifull | Pickup | USD 22990 | Motor: 2.2L mHawk / 140 HP / 320 Nm | MT 6 | 2WD
- S6 DC Semifull | Pickup | USD 23990 | Motor: 2.2L mHawk / 140 HP / 320 Nm | MT 6 | 4WD
- S6 SC Semifull | Pickup | USD 22990 | Motor: 2.2L mHawk / 140 HP / 320 Nm | MT 6 | 4WD

### MAZDA
- BT-50 Full (2026) | Pickup | USD 35990 | Motor: 1.9L | MT 6 | 4x4
- BT-50 Full (2026) | Pickup | USD 38990 | Motor: 1.9L | Automático 6AT | 4x4
- BT-50 Limited (2026) | Pickup | USD 49990 | Motor: 3.0L | Automático 6AT | 4x4
- CX-30 Core (2026) | SUV | USD 24990 | Motor: 2.0L / 153 HP / 200 Nm | Automático 6AT | 2WD
- CX-30 Core+ (2026) | SUV | USD 27990 | Motor: 2.0L / 153 HP / 200 Nm | Automático 6AT | 2WD
- CX-30 High (2026) | SUV | USD 32990 | Motor: 2.0L / 153 HP / 200 Nm | Automático 6AT | 2WD
- CX-5 Core- (2026) | SUV | USD 28990 | Motor: 2.0L / 155 HP / 200 Nm | Automático 6AT | 2WD
- CX-5 Core (2026) | SUV | USD 31990 | Motor: 2.0L / 155 HP / 200 Nm | Automático 6AT | 2WD
- CX-5 High (2026) | SUV | USD 36990 | Motor: 2.0L / 155 HP / 200 Nm | Automático 6AT | 2WD
- CX-5 High+ (2026) | SUV | USD 42990 | Motor: 2.5L / 188 HP / 252 Nm | Automático 6AT | 4WD
- CX-60 High (2026) | SUV | USD 46990 | Motor: 2.5L / 190 HP / 250 Nm | Automático 8AT | 4WD
- CX-60 High MHEV (2026) | SUV | USD 54990 | Motor: 3.3L | Automático 8AT | 4WD
- CX-90 Core (2025) | SUV | USD 58990 | Motor: 3.3L / 340 HP / 500 Nm | Automático 8AT | 4WD
- CX-90 High (2025) | SUV | USD 69990 | Motor: 3.3L / 340 HP / 500 Nm | Automático 8AT | 4WD
- CX-90 Core (2026) | SUV | USD 58990 | Motor: 3.3L / 340 HP / 500 Nm | Automático 8AT | 4WD
- CX-90 High (2026) | SUV | USD 68990 | Motor: 3.3L / 340 HP / 500 Nm | Automático 8AT | 4WD
- CX-90 High+ (2026) | SUV | USD 69990 | Motor: 3.3L / 340 HP / 500 Nm | Automático 8AT | 4WD

### NISSAN
- Frontier LE-Limited (2025) | Pickup | USD 44990 | Motor: 2.5 L / 190 HP / 450 Nm | AT 7 vel. | 4x4
- Frontier S-Sense C/S (2026) | Pickup | USD 32990 | Motor: 2.5 L / 165 HP / 411 Nm | MT 6 vel. | 4x4
- Frontier S-Sense D/C (2026) | Pickup | USD 33990 | Motor: 2.5 L / 165 HP / 411 Nm | MT 6 vel. | 4x4
- Frontier S-Sense D/C (2026) | Pickup | USD 36990 | Motor: 2.5 L / 165 HP / 411 Nm | AT 7 vel. | 4x4
- Frontier XE-Exclusive D/C (2026) | Pickup | USD 39990 | Motor: 2.5 L / 190 HP / 450 Nm | AT 7 vel. | 4x4
- Frontier LE-Limited D/C (2026) | Pickup | USD 45990 | Motor: 2.5 L / 190 HP / 450 Nm | AT 7 vel. | 4x4
- Frontier LE-PRO4X D/C (2026) | Pickup | USD 45990 | Motor: 2.5 L / 190 HP / 450 Nm | AT 7 vel. | 4x4
- Kicks Exclusive (2025) | SUV | USD 23990 | Motor: 1.6 | Automático | 4x2
- Kicks Play Sense (2026) | SUV | USD 17990 | Motor: 1.6 | Automático | 4x2
- Kicks Play Advance (2026) | SUV | USD 18990 | Motor: 1.6 | Automático | 4x2
- New Kicks Sense (2026) | SUV | USD 23990 | Motor: 1.0T / 120 HP / 220 Nm | AT 6DCT | 4x2
- New Kicks Advance Plus (2026) | SUV | USD 24990 | Motor: 1.0T / 120 HP / 220 Nm | AT 6DCT | 4x2
- New Kicks Exclusive (2026) | SUV | USD 27990 | Motor: 1.0T / 120 HP / 220 Nm | AT 6DCT | 4x2
- New Qashqai Advance Plus (2025) | SUV | USD 35990 | Motor: 1.3L Turbo / 147 HP / 250 Nm | CVT | 4x2
- New Qashqai Exclusive (2025) | SUV | USD 38990 | Motor: 1.3L Turbo / 147 HP / 250 Nm | CVT | 4x4
- New Qashqai Sense (2026) | SUV | USD 25990 | Motor: 1.3L Turbo / 147 HP / 250 Nm | MT | 4x2
- New Qashqai Sense (2026) | SUV | USD 28990 | Motor: 1.3L Turbo / 147 HP / 250 Nm | CVT | 4x2
- New Qashqai Advance (2026) | SUV | USD 33990 | Motor: 1.3L Turbo / 147 HP / 250 Nm | CVT | 4x2
- New Qashqai Advance Plus (2026) | SUV | USD 35990 | Motor: 1.3L Turbo / 147 HP / 250 Nm | CVT | 4x2
- New Qashqai Exclusive (2026) | SUV | USD 38990 | Motor: 1.3L Turbo / 147 HP / 250 Nm | CVT | 4x4
- Pathfinder Limited (2024) | SUV | USD 54990 | Motor: 3.5L V6 / 270 HP / 340 Nm | AT 9 vel. | 4x2
- Pathfinder Limited (2025) | SUV | USD 56990 | Motor: 3.5L V6 / 270 HP / 340 Nm | AT 9 vel. | 4x2
- Pathfinder Platinum 7P (2026) | SUV | USD 64990 | Motor: 3.5L V6 / 270 HP / 340 Nm | AT 9 vel. | 4x4
- Patrol Exclusive (2025) | SUV | USD 109000 | Motor: 5.6L V8 / 400 HP / 560 Nm | AT 7 vel. | 4x4
- Sentra MC Advance (2025) | Sedan | USD 26990 | Motor: 2.0 L / 145 HP / 197 Nm | CVT | Delantera
- Sentra MC Advance (2026) | Sedan | USD 26990 | Motor: 2.0 L / 145 HP / 197 Nm | CVT | Delantera
- Versa Sense (2026) | Sedan | USD 17990 | Motor: 1.6 L / 118 HP / 149 Nm | CVT | Delantera
- Versa Exclusive (2026) | Sedan | USD 21990 | Motor: 1.6 L / 118 HP / 149 Nm | CVT | Delantera
- X-Trail Ice Sense 5P (2026) | SUV | USD 33990 | Motor: 2.5L / 181 HP / 180 Nm | CVT | 4x2
- X-Trail e Advance e-POWER 7P (2026) | SUV | USD 41990 | Motor: 1.5L Turbo 142 HP + e-Motor 205 HP / 330 Nm | Reductor AT | AWD e-4ORCE
- X-Trail e Exclusive e-POWER 7P (2026) | SUV | USD 46990 | Motor: 1.5L Turbo 142 HP + e-Motor 205 HP / 330 Nm | Reductor AT | AWD e-4ORCE

### RAM
- 1500 RHO Crew Cab (2025) | Pickup | USD 149990 | Motor: 3.0TT SC G | AT 8 | 4x4
- 1500 Rebel Crew Cab (2026) | Pickup | USD 89990 | Motor: 3.0TT G / 420 HP / 636 Nm | AT 8 | 4x4
- Rampage Big Horn (2025) | Pickup | USD 34990 | Motor: 2.2 D / 200 HP / 450 Nm | AT 9 | 4x4
- Rampage Laramie (2025) | Pickup | USD 39990 | Motor: 2.2 D / 200 HP / 450 Nm | AT 9 | 4x4
- Rampage Big Horn (2026) | Pickup | USD 34990 | Motor: 2.2 D / 200 HP / 450 Nm | AT 9 | 4x4
- Rampage Laramie (2026) | Pickup | USD 40990 | Motor: 2.2 D / 200 HP / 450 Nm | AT 9 | 4x4
- Rampage Rebel (2026) | Pickup | USD 40990 | Motor: 2.2 D / 200 HP / 450 Nm | AT 9 | 4x4
- Rampage R/T (2026) | Pickup | USD 42990 | Motor: 2.0 G / 272 HP / 400 Nm | AT 9 | 4x4

### SOUEAST
- S06 1.6T 6DCT IV | SUV | USD 25490 | Motor: 1.6T / 194 HP / 290 Nm | Automático DCT 7 | Delantera
- S06 1.5T GDI + DHT PHEV V GLS | SUV | USD 27490 | Motor: 1.5T / 145 HP / 290 Nm | 7DCT | Delantera
- S06 1.5T GDI + DHT PHEV III GL | SUV | USD 24490 | Motor: 1.5T / 145 HP / 290 Nm | 7DCT | Delantera
- S07 1.6T - 7DCT | SUV | USD 26490 | Motor: 1.6T / 194 HP / 290 Nm | Automático DCT 7 | FWD
- S09 1.6T - 7DCT 2WD | SUV | USD 27490 | Motor: 1.6T / 194 HP / 290 Nm | Automático DCT 7 | 2WD
- S09 2.0T - 8AT - 4WD | SUV | USD 32490 | Motor: 2.0T / 251 HP / 390 Nm | Automático 8AT | 4WD

### VOLKSWAGEN
- Amarok DC Highline | Pick-up | USD 46900 | Motor: 2.0L TDI (180 HP / 420 Nm) | AT8 | 4MOTION
- Amarok DC Highline | Pick-up | USD 48900 | Motor: 2.0L TDI (180 HP / 420 Nm) | AT8 | 4MOTION
- Amarok DC Comfortline | Pick-up | USD 49900 | Motor: 3.0L V6 TDI (258 HP / 580 Nm) | AT8 | 4MOTION
- Amarok DC Highline | Pick-up | USD 55900 | Motor: 3.0L V6 TDI (258 HP / 580 Nm) | AT8 | 4MOTION
- Amarok DC Extreme | Pick-up | USD 58900 | Motor: 3.0L V6 TDI (258 HP / 580 Nm) | AT8 | 4MOTION
- Nivus CL | SUV Coupé | USD 22500 | Motor: 1.0 200 TSI (116 HP / 200 Nm) | AT6 | Delantera (4x2)
- Nivus HL | SUV Coupé | USD 24500 | Motor: 1.0 200 TSI (116 HP / 200 Nm) | AT6 | Delantera (4x2)
- Nivus GTS | SUV Coupé | USD 27500 | Motor: 1.4 250 TSI (150 HP / 250 Nm) | AT6 | Delantera (4x2)
- Nueva Tiguan Life | SUV | USD 39900 | Motor: 1.4 250 TSI (150 HP / 250 Nm) | DSG6 | Delantera (4x2)
- Nueva Tiguan R-Line | SUV | USD 45900 | Motor: 1.4 250 TSI (150 HP / 250 Nm) | DSG6 | Delantera (4x2)
- Nuevo Taos MX CL | SUV | USD 29900 | Motor: 1.4 250 TSI (150 HP / 250 Nm) | AT6 | Delantera (4x2)
- Nuevo Taos MX HL | SUV | USD 32900 | Motor: 1.4 250 TSI (150 HP / 250 Nm) | AT6 | Delantera (4x2)
- Polo CL | Hatchback | USD 19500 | Motor: 1.0 170 TSI (116 HP / 170 Nm) | AT6 | Delantera (4x2)
- Polo HL | Hatchback | USD 20900 | Motor: 1.0 170 TSI (116 HP / 170 Nm) | AT6 | Delantera (4x2)
- Polo Track TL | Hatchback | USD 14900 | Motor: 1.0 MPI (84 HP / 102 Nm) | MT5 | Delantera (4x2)
- Polo Track TL | Hatchback | USD 15500 | Motor: 1.6 MPI (110 HP / 155 Nm) | MT5 | Delantera (4x2)
- Saveiro SC Robust | Pick-up | USD 15500 | Motor: 1.6 MPI (110 HP / 155 Nm) | MT5 | Delantera (4x2)
- Saveiro DC Robust | Pick-up | USD 16900 | Motor: 1.6 MPI (110 HP / 155 Nm) | MT5 | Delantera (4x2)
- Saveiro DC Extreme | Pick-up | USD 20500 | Motor: 1.6 MPI (110 HP / 155 Nm) | MT5 | Delantera (4x2)
- T-Cross TL | SUV | USD 21500 | Motor: 1.0 200 TSI (116 HP / 200 Nm) | AT6 | Delantera (4x2)
- T-Cross CL | SUV | USD 23500 | Motor: 1.0 200 TSI (116 HP / 200 Nm) | AT6 | Delantera (4x2)
- T-Cross HL | SUV | USD 25500 | Motor: 1.4 250 TSI (150 HP / 250 Nm) | AT6 | Delantera (4x2)
- T-Cross HL + Techo | SUV | USD 26900 | Motor: 1.4 250 TSI (150 HP / 250 Nm) | AT6 | Delantera (4x2)
- Tera TL | SUV Compacto | USD 17900 | Motor: 1.0 MPI (84 HP / 102 Nm) | MT5 | Delantera (4x2)
- Tera CL | SUV Compacto | USD 18900 | Motor: 1.0 170 TSI (116 HP / 170 Nm) | MT5 | Delantera (4x2)
- Tera CL | SUV Compacto | USD 19900 | Motor: 1.0 170 TSI (116 HP / 170 Nm) | AT6 | Delantera (4x2)
- Tera HL | SUV Compacto | USD 21500 | Motor: 1.0 170 TSI (116 HP / 170 Nm) | AT6 | Delantera (4x2)
- Tera HL Outfit | SUV Compacto | USD 22500 | Motor: 1.0 170 TSI (116 HP / 170 Nm) | AT6 | Delantera (4x2)
- Teramont Premium 3H | SUV | USD 69900 | Motor: 3.6 V6 (280 HP / 360 Nm) | AT8 | 4MOTION
- Teramont Premium 3H | SUV | USD 73900 | Motor: 2.0 TSI (235 HP / 350 Nm) | AT8 | 4MOTION
`;

        const reglasNegocio = `
1. ¿Cobran comisión?: "Nuestra asesoría inicial es sin costo. Al concretar la inversión cobramos un honorario estándar del mercado."
2. ¿Tienen garantía?: "Todos los vehículos gestionados cuentan con garantía del representante oficial (ej: 3 a 5 años dependiendo la marca)."
        `;

        const systemInstruction = `
Sos el Asesor Experto en Inversiones Automotrices de DATACAR.
Tu tono es profesional, empático y premium.

INVENTARIO OFICIAL:
${inventarioAutos}

PREGUNTAS FRECUENTES:
${reglasNegocio}

REGLA DE ORO: Si el cliente pregunta por un auto, dale el precio y las características. LUEGO, decile que para ver opciones de financiación o reservar, necesitás su Nombre y su WhatsApp para que un asesor humano lo contacte. Si te piden un auto que no está en la lista, deciles que lo conseguimos a pedido y pedí sus datos.
        `;
        // 📚 ACÁ TERMINA EL ENTRENAMIENTO
        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemInstruction }] },
                { role: "model", parts: [{ text: "Entendido. Soy el Asesor de DATACAR y operaré bajo estas reglas de transparencia corporativa." }] }
            ]
        });

        const result = await chat.sendMessage(message);
        res.status(200).json({ reply: result.response.text() });
        
    } catch (error) {
        console.error("Error Gemini:", error);
        res.status(500).json({ error: "El sistema está experimentando una demora. Por favor, intentá de nuevo." });
    }
}

