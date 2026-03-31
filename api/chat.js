import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Solo se aceptan peticiones POST' }); }

    try {
        const { message } = req.body;
        // 1. TU LLAVE ACÁ
        const apiKey = "AIzaSyDDq2-433ObsJ9rL9BrLi5Pb10n8tA3Ckk".trim();
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        // 📚 BASE DE DATOS (Abreviada para estabilidad, podés ampliarla luego)
        const inventarioAutos = `
### BYD: Song Pro (USD 26.900), Shark (USD 44.900), Song Plus (USD 33.900), Tang EV (USD 59.900).
### CHEVROLET: S10 (USD 33.990 - 50.990), Onix (USD 11.990 - 21.990), Silverado (USD 78.990).
### HYUNDAI: Tucson (USD 29.990 - 43.990), Santa Fe (USD 45.990 - 57.990), HB20 (USD 11.500 - 15.490).
### KIA: K3 (USD 17.990 - 26.990), Sportage (USD 27.990), Tasman (USD 39.990 - 59.990).
### VOLKSWAGEN: Amarok (USD 46.900 - 58.900), Taos (USD 29.900 - 32.900), Nivus (USD 22.500 - 27.500).
        `;

        // 🧠 PERSONALIDAD DE ASESOR ESTRATÉGICO
        const systemInstruction = `
Sos un Asesor Estratégico de Inversiones Automotrices en DATACAR. 
Tu misión es proteger la inversión del cliente con una mirada crítica e imparcial.

INVENTARIO: ${inventarioAutos}

REGLAS DE COMPORTAMIENTO:
1. MENTALIDAD DE CONSULTOR: Si el cliente elige un auto, mencioná un punto técnico (motor, origen) pero cuestioná aristas como: Valor de reventa, costo de repuestos según origen, o calidad del servicio postventa del representante.
2. INDAGACIÓN: Si no sabe qué comprar, hacé UNA sola pregunta clave para entender su necesidad (ej: ¿Uso urbano o viajes al interior?).
3. FORMATO: Escribí párrafos muy cortos. Usá viñetas. No seas un "bot-folleto".
4. EL CIERRE (CTA): Una vez orientado el cliente, decí siempre: "Nuestra consultoría es gratuita para ayudarte en el proceso de compra, pero para profundizar necesitamos hablar con un humano. ¿Me dejarías tu nombre y WhatsApp?".
5. LEAD: Si te da sus datos, agrega al final: [LEAD: Nombre, Numero].
        `;

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemInstruction }] },
                { role: "model", parts: [{ text: "Entendido. Soy el Asesor Estratégico de DATACAR. Analizaré riesgos y beneficios para el cliente." }] }
            ]
        });

        const result = await chat.sendMessage(message);
        let replyText = result.response.text();

        // 🚀 INTERCEPTOR PARA MAKE.COM
        const leadMatch = replyText.match(/\[LEAD:\s*(.*?),\s*(.*?)\]/);
        if (leadMatch) {
            try {
                await fetch("TU_WEBHOOK_DE_MAKE_AQUI", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre: leadMatch[1], celular: leadMatch[2], origen: "Consultor IA" })
                });
            } catch (e) { console.error("Error Make", e); }
            replyText = replyText.replace(/\[LEAD:.*\]/, "").trim();
        }

        res.status(200).json({ reply: replyText });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "El sistema está descansando. Probá de nuevo en un segundo." });
    }
}
