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
        
        // 1. CARGÁ TU LLAVE ACÁ (Manteniendo las comillas)
        const apiKey = "AIzaSyBnp938UgpTbF6uA-zu2zbGw4m7RN9Ubuo".trim();
        
        console.log("Conectando a Gemini 1.5 Flash...");

        const genAI = new GoogleGenerativeAI(apiKey);
        
        // 2. MODELO CORREGIDO
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

        // 3. INVENTARIO COMPLETO
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
- Coolray FL DCT AT GK (2027) | SUV | USD 20990 | Motor: 1.5cc / 171 HP / 290 Nm | Automático DCT 7 | Delantera
- Coolray Lite Automático (2026) | SUV | USD 17990 | Motor: 1.5 / 125 HP / 152 Nm | CVT | 4x2

### HONDA
- CR-V EX | SUV | USD 47000 | AT | 2WD
- CR-V EX Con Cuero y Llanta | SUV | USD 48500 | AT | 2WD
- CR-V EHEV | SUV | USD 56900 | Motor: 2.0L + Eléctrico | Automático | 4WD
- HR-V EX | SUV | USD 28500 | Motor: 1.5 i-VTEC | CVT | 2WD
- HR-V TOURING | SUV | USD 35900 | Motor: 1.5 Turbo | CVT | 2WD
- PILOT ELITE | SUV | USD 84900 | Motor: V6 3.5 | AT | 4WD

### HYUNDAI
- GRAND I10 HATCHBACK (2025) | Hatchback | USD 10990 | Motor: 1.0 MPI | MT | 4x2
- HB20 HATCHBACK (2026) | Hatchback | USD 12990 | Motor: 1.0cc | MT | 4x2
- KONA GLS (2026) | SUV | USD 29990 | Motor: 1.6 GDI | Automático | 4x2
- PALISADE CALLIGRAPHY 8 Pas (2026) | SUV | USD 67990 | Motor: 2.5 T-GDI HEV | Automático | 4x4
- SANTA FE 7PAS (2025) | SUV | USD 57990 | Motor: 1.6 T-GDI HEV | Automático | 4x4
- TUCSON GL (2026) | SUV | USD 29990 | Motor: 2.0 Naftero | Automático | 4x2

### ISUZU
- D-MAX LUJO SPORT (2025) | Pickup | USD 49990 | Motor: 3.0cc | AT 6a | 4x4
- D-MAX STD PLUS (2026) | Pickup | USD 33990 | Motor: 1.9cc | MT 6a | 4x4
- MU-X LUJO PESS (2026) | SUV | USD 59990 | Motor: 3.0cc | AT 6a | 4x4

### JEEP
- Commander Overland (2025) | SUV | USD 41990 | Motor: 1.3T | AT 6 | 4x2
- Compass Sport (2026) | SUV | USD 28500 | Motor: 1.3T | AT 6 | 4x2
- Renegade Altitude (2026) | SUV | USD 21990 | Motor: 1.3T | AT 6 | 4x2
- Wrangler Rubicon 4P (2026) | SUV | USD 86990 | Motor: 2.0L Turbo | Automático 8AT | 4x4

### JETOUR
- DASHING GL | SUV | USD 20490 | Motor: 1.5T | Automático DCT
- T2 LUX | SUV | USD 35990 | Motor: 2.0T | AT 7DCT | XWD

### KGM SSANGYONG
- KORANDO LIMITED (2025) | SUV | USD 28500 | Motor: 1.497cc | AT 6 marchas | 4x2
- MUSSO GRAND LIMITED (2025) | Pickup | USD 47990 | Motor: 2.157cc | AT 6 marchas | 4x4
- TORRES DELUXE (2025) | SUV | USD 27990 | Motor: 1.497cc | AT 6 marchas | 4x2

### KIA
- Carnival EX Ejecutivo | SUV/MPV | USD 60990 | Motor: 1.6T | AT 6 | 4x2
- Ev5 WIND | SUV | USD 50990 | Automático | 4x2
- K3-sedan LX | Sedan | USD 17990 | Motor: 1.4 | MT 6 vel. | 4x2
- K3-sedan GT-Line | Sedan | USD 26990 | Motor: 1.4 | AT 6 vel. | 4x2
- Picanto LX | Hatchback | USD 10500 | Motor: 1.0 | MT 5 vel. | 4x2
- Seltos EX Full | SUV | USD 27500 | Motor: 1.5 | AT 6 vel. | 4x2
- Sonet EX Limited | SUV | USD 23990 | Motor: 1.5 | AT 6 vel. | 4x2
- Tasman X-PRO | Pickup | USD 59990 | Motor: 2.5 | AT 8 | 4x4

### NISSAN
- Frontier LE-PRO4X D/C (2026) | Pickup | USD 45990 | Motor: 2.5 L | AT 7 vel. | 4x4
- Kicks Exclusive (2025) | SUV | USD 23990 | Motor: 1.6 | Automático | 4x2
- Patrol Exclusive (2025) | SUV | USD 109000 | Motor: 5.6L V8 | AT 7 vel. | 4x4

### RAM
- 1500 Rebel Crew Cab (2026) | Pickup | USD 89990 | Motor: 3.0TT G | AT 8 | 4x4
- Rampage Laramie (2026) | Pickup | USD 40990 | Motor: 2.2 D | AT 9 | 4x4

### VOLKSWAGEN
- Amarok DC Extreme | Pick-up | USD 58900 | Motor: 3.0L V6 TDI | AT8 | 4MOTION
- Nivus HL | SUV Coupé | USD 24500 | Motor: 1.0 200 TSI | AT6 | Delantera (4x2)
- Nueva Tiguan R-Line | SUV | USD 45900 | Motor: 1.4 250 TSI | DSG6 | Delantera (4x2)
- Nuevo Taos MX HL | SUV | USD 32900 | Motor: 1.4 250 TSI | AT6 | Delantera (4x2)
- Polo Track TL | Hatchback | USD 14900 | Motor: 1.0 MPI | MT5 | Delantera (4x2)
- Saveiro DC Extreme | Pick-up | USD 20500 | Motor: 1.6 MPI | MT5 | Delantera (4x2)
- T-Cross HL + Techo | SUV | USD 26900 | Motor: 1.4 250 TSI | AT6 | Delantera (4x2)
- Teramont Premium 3H | SUV | USD 73900 | Motor: 2.0 TSI | AT8 | 4MOTION
`;

        const reglasNegocio = `
1. ¿Cobran comisión?: "Nuestra asesoría inicial es sin costo. Al concretar la inversión cobramos un honorario estándar del mercado."
2. ¿Tienen garantía?: "Todos los vehículos gestionados cuentan con garantía del representante oficial (ej: 3 a 5 años dependiendo la marca)."
        `;

        // 4. EL CEREBRO DE LA IA (¡Ahora declarado una sola vez!)
        const systemInstruction = `
Sos el Asesor Experto en Inversiones Automotrices de DATACAR.
Tu personalidad es cálida, súper empática, entusiasta y premium. Sos un vendedor de élite, no una enciclopedia.

INVENTARIO OFICIAL:
${inventarioAutos}

PREGUNTAS FRECUENTES:
${reglasNegocio}

TUS REGLAS DE ORO (ESTRICTAS):
1. EMPATÍA PRIMERO: Siempre validá la consulta del cliente con entusiasmo. (Ej: "¡Qué excelente elección! La S10 es una verdadera máquina...").
2. REGLA DE 2 OPCIONES: Si el cliente pregunta por un modelo con muchas versiones (ej. S10, Hilux), NUNCA le tires toda la lista. Mostrale solo 2 opciones destacadas (la más accesible y la más equipada) y aclarale que tenés más versiones disponibles.
3. FORMATO VISUAL: Prohibido escribir bloques de texto largos. Escribí en párrafos cortos de máximo 2 líneas.
4. VIÑETAS LIMPIAS: Cuando muestres un auto, usá siempre un emoji (ej: 🚙) y dale un "Enter" (salto de línea) para separarlo del siguiente auto. 
5. CIERRE DE VENTAS: Después de darle la info corta y clara, invitalo a avanzar: "Para pasarte el PDF completo y ver opciones de financiación, ¿me dejarías tu Nombre y número de WhatsApp para que un asesor especializado te escriba?".
6. MANDO SECRETO PARA LEADS: Apenas el cliente te escriba su nombre y su número, agradecele la confianza y AL FINAL de tu respuesta, agregá EXACTAMENTE este formato: [LEAD: NombreDelCliente, NumeroDelCliente]. 
        `;
        
        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemInstruction }] },
                { role: "model", parts: [{ text: "Entendido. Soy el Asesor de DATACAR. Me basaré estrictamente en el inventario provisto y usaré la etiqueta secreta al capturar los datos." }] }
            ]
        });

        const result = await chat.sendMessage(message);
        let replyText = result.response.text();

        // 5. INTERCEPTOR DE LEADS PARA MAKE.COM
        const leadMatch = replyText.match(/\[LEAD:\s*(.*?),\s*(.*?)\]/);
        
        if (leadMatch) {
            const nombreCliente = leadMatch[1];
            const celularCliente = leadMatch[2];

            console.log("¡NUEVO LEAD CAPTURADO!", nombreCliente, celularCliente);

            try {
                // ⚠️ REEMPLAZÁ ESTE LINK POR EL TUYO DE MAKE.COM
                await fetch("https://hook.us1.make.com/TU_WEBHOOK_AQUI", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        nombre: nombreCliente, 
                        celular: celularCliente,
                        origen: "Asesor IA Datacar" 
                    })
                });
            } catch (error) {
                console.error("Error enviando a Make:", error);
            }

            // Borra la etiqueta secreta para que no se imprima en la pantalla del usuario
            replyText = replyText.replace(/\[LEAD:.*\]/, "").trim();
        }

        res.status(200).json({ reply: replyText });
        
    } catch (error) {
        console.error("Error Gemini:", error);
        res.status(500).json({ error: "El sistema está experimentando una demora. Por favor, intentá de nuevo." });
    }
}
