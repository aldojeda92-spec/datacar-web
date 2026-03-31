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
        const apiKey = "PEGA_ACA_TU_LLAVE_NUEVA_DE_GOOGLE".trim();
        
        // 2. Imprimimos un aviso en Vercel para saber que se actualizó el código
        console.log("Conectando a Gemini con llave limpia...");

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemInstruction = `Sos el Asesor Experto en Gestión de Inversiones Automotrices de DATACAR. Tu misión es perfilar al cliente, brindar opciones de vehículos y capturar SIEMPRE su Nombre y Celular para derivarlo a un asesor humano. Basate en datos reales. Si no sabés algo, pedí sus datos para que un asesor especializado lo contacte.`;

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
