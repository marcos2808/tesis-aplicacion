import Carne from "../models/carneModel.js";
import Animal from "../models/animalModel.js";
import Fundo from "../models/fundoModel.js";
import Excel from "excel4node";

class CarneController {
    async createCarne(req, res) {
        const { animalId, sexo, pesoNacer, fechaNacimiento, pesoDestete, temporada } = req.body;
        const fundoId = req.user._id;

        const epoca = temporada ? temporada.toLowerCase() === "invierno" : false;

        if (!animalId || !sexo || pesoNacer === undefined || !fechaNacimiento || pesoDestete === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        try {
            const carne = new Carne({
                animal: animalId,
                fundo: fundoId,
                sexo,
                epoca,
                pesoNacer,
                fechaNacimiento,
                pesoDestete
            });

            await carne.save();
            res.status(201).json({ message: "Registro de carne creado exitosamente", carne });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCarne(req, res) {
        const { id, pesoAnio, fechaAnio, peso18Meses, fecha18Meses, peso24Meses, fecha24Meses } = req.body;
        const fundoId = req.user._id;

        if (!id ) return res.status(400).json({ message: "El ID del registro es obligatorios para actualizar el registro de carne" });

        try {
            const carne = await Carne.findOne({ _id: id, fundo: fundoId });
            if (!carne) return res.status(404).json({ message: "Registro de carne no encontrado" });

            if (pesoAnio !== undefined) carne.pesoAnio = pesoAnio;
            if (fechaAnio !== undefined) carne.fechaAnio = fechaAnio;
            if (peso18Meses !== undefined) carne.peso18Meses = peso18Meses;
            if (fecha18Meses !== undefined) carne.fecha18Meses = fecha18Meses;
            if (peso24Meses !== undefined) carne.peso24Meses = peso24Meses;
            if (fecha24Meses !== undefined) carne.fecha24Meses = fecha24Meses;

            await carne.save();
            res.status(200).json({ message: "Registro de carne actualizado exitosamente", carne });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async reporteCarne(req, res) {
        try {
            // Obtener todos los registros de Carne y los datos asociados de Animal
            const carnes = await Carne.find().populate('animal');

            // Verificar que hay datos
            if (carnes.length === 0) {
                return res.status(404).json({ message: "No hay datos disponibles para generar el reporte." });
            }

            // Configuración del libro de trabajo y la hoja
            const wb = new Excel.Workbook();
            const ws = wb.addWorksheet('Reporte de Carne');

            // Definir estilos
            const style = wb.createStyle({
                alignment: {
                    horizontal: 'center',
                    vertical: 'center',
                },
                font: {
                    size: 12,
                },
            });

            // Configurar columnas
            const columnWidths = [30, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
            columnWidths.forEach((width, index) => ws.column(index + 1).setWidth(width));

            // Agregar encabezados
            const headers = [
                'Número del Animal', 'Sexo', 'Epoca', 'Peso al Nacer', 'Fecha de Nacimiento',
                'Peso al Destete', 'Peso a 1 Año', 'Fecha a 1 Año', 'Peso a 18 Meses',
                'Fecha a 18 Meses', 'Peso a 24 Meses', 'Fecha a 24 Meses'
            ];
            headers.forEach((header, index) => ws.cell(1, index + 1).string(header).style(style));

            // Agregar datos de Carne
            carnes.forEach((carne, index) => {
                const fila = index + 2;

                // Verifica si el animal está presente y tiene el campo 'animal'
                const numeroAnimal = carne.animal ? carne.animal.animal.toString() : 'Desconocido';
                const epoca = carne.epoca ? 'Invierno' : 'Verano';

                ws.cell(fila, 1).string(numeroAnimal).style(style);
                ws.cell(fila, 2).string(carne.sexo || 'Desconocido').style(style);
                ws.cell(fila, 3).string(epoca).style(style);
                ws.cell(fila, 4).number(carne.pesoNacer || 0).style(style);
                ws.cell(fila, 5).date(carne.fechaNacimiento || new Date()).style(style);
                ws.cell(fila, 6).number(carne.pesoDestete || 0).style(style);
                ws.cell(fila, 7).number(carne.pesoAnio || 0).style(style);
                ws.cell(fila, 8).date(carne.fechaAnio || new Date()).style(style);
                ws.cell(fila, 9).number(carne.peso18Meses || 0).style(style);
                ws.cell(fila, 10).date(carne.fecha18Meses || new Date()).style(style);
                ws.cell(fila, 11).number(carne.peso24Meses || 0).style(style);
                ws.cell(fila, 12).date(carne.fecha24Meses || new Date()).style(style);
            });

            // Calcular estadísticas generales
            const datos = {
                pesoNacer: [],
                pesoDestete: [],
                pesoAnio: [],
                peso18Meses: [],
                peso24Meses: []
            };

            carnes.forEach(carne => {
                if (carne.pesoNacer !== undefined) datos.pesoNacer.push(carne.pesoNacer);
                if (carne.pesoDestete !== undefined) datos.pesoDestete.push(carne.pesoDestete);
                if (carne.pesoAnio !== undefined) datos.pesoAnio.push(carne.pesoAnio);
                if (carne.peso18Meses !== undefined) datos.peso18Meses.push(carne.peso18Meses);
                if (carne.peso24Meses !== undefined) datos.peso24Meses.push(carne.peso24Meses);
            });

            const calcularEstadisticas = (data) => {
                if (data.length === 0) {
                    return { media: 0, desviacion: 0, maximo: 0, minimo: 0 };
                }

                const calcularMedia = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
                const calcularDesviacion = (arr, media) => Math.sqrt(arr.reduce((a, b) => a + Math.pow(b - media, 2), 0) / arr.length);
                const max = (arr) => Math.max(...arr);
                const min = (arr) => Math.min(...arr);

                const media = calcularMedia(data);
                return {
                    media,
                    desviacion: calcularDesviacion(data, media),
                    maximo: max(data),
                    minimo: min(data)
                };
            };

            // Agregar encabezados para estadísticas
            const startRow = carnes.length + 3;
            ws.cell(startRow, 1).string('Campo').style(style);
            ws.cell(startRow, 2).string('Media').style(style);
            ws.cell(startRow, 3).string('Desviación Estándar').style(style);
            ws.cell(startRow, 4).string('Máximo').style(style);
            ws.cell(startRow, 5).string('Mínimo').style(style);

            // Agregar estadísticas generales
            let fila = startRow + 1;
            for (const [campo, valores] of Object.entries(datos)) {
                if (valores.length > 0) {
                    const estadisticas = calcularEstadisticas(valores);

                    ws.cell(fila, 1).string(campo).style(style);
                    ws.cell(fila, 2).number(estadisticas.media).style(style);
                    ws.cell(fila, 3).number(estadisticas.desviacion).style(style);
                    ws.cell(fila, 4).number(estadisticas.maximo).style(style);
                    ws.cell(fila, 5).number(estadisticas.minimo).style(style);
                    fila++;
                }
            }

            // Enviar el archivo Excel como respuesta
            wb.write('Reporte_Carne.xlsx', res);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default CarneController;
