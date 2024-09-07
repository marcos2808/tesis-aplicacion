import Leche from "../models/lecheModel.js";
import Animal from "../models/animalModel.js";
import excel from 'excel4node';
import { mean, std, max, min } from 'mathjs';

class LecheController {
    async createLeche(req, res) {
        const { animal, produccionTotal, produccionTotalDias }= req.body;
        const fundoId = req.user._id;

        if (!animal || !produccionTotal || !produccionTotalDias) {
            return res.status(400).json({ message: "Animal, producción total y días de producción total son obligatorios" });
        }

        try {
            const leche = new Leche({
                fundo: fundoId,
                animal,
                produccionTotal,
                produccionTotalDias,
            });

            await leche.save();
            res.status(201).json({ message: "Registro de leche creado exitosamente", leche });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateLeche(req, res) {
        const { id, produccionA305Dias, produccionTotalA305Dias, lactancia1, duracionLactancia1, lactancia2, duracionLactancia2, lactancia3, duracionLactancia3, lactancia4, duracionLactancia4, lactancia5, duracionLactancia5, lactancia1A305, lactancia2A305, lactancia3A305, lactancia4A305, lactancia5A305 } = req.body;
        const fundoId = req.user._id;

        if (!id) return res.status(400).json({ message: "El ID del registro y el ID del animal son obligatorios para actualizar el registro de leche" });

        try {
            const leche = await Leche.findOne({ _id: id, animal, fundo: fundoId });
            if (!leche) return res.status(404).json({ message: "Registro de leche no encontrado" });

            // Actualizar los campos si se proporcionan
            if (produccionA305Dias !== undefined) leche.produccionA305Dias = produccionA305Dias;
            if (produccionTotalA305Dias !== undefined) leche.produccionTotalA305Dias = produccionTotalA305Dias;
            if (lactancia1 !== undefined) leche.lactancia1 = lactancia1;
            if (duracionLactancia1 !== undefined) leche.duracionLactancia1 = duracionLactancia1;
            if (lactancia2 !== undefined) leche.lactancia2 = lactancia2;
            if (duracionLactancia2 !== undefined) leche.duracionLactancia2 = duracionLactancia2;
            if (lactancia3 !== undefined) leche.lactancia3 = lactancia3;
            if (duracionLactancia3 !== undefined) leche.duracionLactancia3 = duracionLactancia3;
            if (lactancia4 !== undefined) leche.lactancia4 = lactancia4;
            if (duracionLactancia4 !== undefined) leche.duracionLactancia4 = duracionLactancia4;
            if (lactancia5 !== undefined) leche.lactancia5 = lactancia5;
            if (duracionLactancia5 !== undefined) leche.duracionLactancia5 = duracionLactancia5;
            if (lactancia1A305 !== undefined) leche.lactancia1A305 = lactancia1A305;
            if (lactancia2A305 !== undefined) leche.lactancia2A305 = lactancia2A305;
            if (lactancia3A305 !== undefined) leche.lactancia3A305 = lactancia3A305;
            if (lactancia4A305 !== undefined) leche.lactancia4A305 = lactancia4A305;
            if (lactancia5A305 !== undefined) leche.lactancia5A305 = lactancia5A305;

            await leche.save();
            res.status(200).json({ message: "Registro de leche actualizado exitosamente", leche });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduccionDiaria(req, res) {
        const { animal, produccionDiaria } = req.body;
        const fundoId = req.user._id;

        try {
            const leche = await Leche.findOne({ animal: animal, fundo: fundoId });
            if (!leche) return res.status(404).json({ message: "Registro de leche no encontrado" });

            // Actualizar la producción diaria y recalcular el promedio
            if (produccionDiaria !== undefined) {
                leche.produccionTotal += produccionDiaria;
                leche.produccionTotalDias += 1;
                leche.promedioProduccionDiaria = leche.produccionTotal / leche.produccionTotalDias;
            }

            await leche.save();
            res.status(200).json({ message: "Producción diaria actualizada exitosamente", leche });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    async reporteLeche(req, res) {
        const fundoId = req.user._id;

        try {
            const leches = await Leche.find({ fundo: fundoId }).populate('animal');
    
            const wb = new excel.Workbook();
            const ws = wb.addWorksheet('Reporte Leche');
    
            const headingColumnNames = [
                "Animal",
                "Producción Total",
                "Producción Total Días",
                "Producción a 305 Días",
                "Producción Total a 305 Días",
                "Lactancia 1",
                "Duración Lactancia 1",
                "Lactancia 2",
                "Duración Lactancia 2",
                "Lactancia 3",
                "Duración Lactancia 3",
                "Lactancia 4",
                "Duración Lactancia 4",
                "Lactancia 5",
                "Duración Lactancia 5",
                "Lactancia 1 a 305",
                "Lactancia 2 a 305",
                "Lactancia 3 a 305",
                "Lactancia 4 a 305",
                "Lactancia 5 a 305",
                "Producción Diaria",
                "Promedio Producción Diaria"
            ];
    
            let headingColumnIndex = 1;
            headingColumnNames.forEach(heading => {
                ws.cell(1, headingColumnIndex++).string(heading);
            });
    
            let rowIndex = 2;
            leches.forEach(record => {
                ws.cell(rowIndex, 1).string(record.animal.animal.toString());
                ws.cell(rowIndex, 2).number(record.produccionTotal);
                ws.cell(rowIndex, 3).number(record.produccionTotalDias);
                ws.cell(rowIndex, 4).number(record.produccionA305Dias || 0);
                ws.cell(rowIndex, 5).number(record.produccionTotalA305Dias || 0);
                ws.cell(rowIndex, 6).number(record.lactancia1 || 0);
                ws.cell(rowIndex, 7).number(record.duracionLactancia1 || 0);
                ws.cell(rowIndex, 8).number(record.lactancia2 || 0);
                ws.cell(rowIndex, 9).number(record.duracionLactancia2 || 0);
                ws.cell(rowIndex, 10).number(record.lactancia3 || 0);
                ws.cell(rowIndex, 11).number(record.duracionLactancia3 || 0);
                ws.cell(rowIndex, 12).number(record.lactancia4 || 0);
                ws.cell(rowIndex, 13).number(record.duracionLactancia4 || 0);
                ws.cell(rowIndex, 14).number(record.lactancia5 || 0);
                ws.cell(rowIndex, 15).number(record.duracionLactancia5 || 0);
                ws.cell(rowIndex, 16).number(record.lactancia1A305 || 0);
                ws.cell(rowIndex, 17).number(record.lactancia2A305 || 0);
                ws.cell(rowIndex, 18).number(record.lactancia3A305 || 0);
                ws.cell(rowIndex, 19).number(record.lactancia4A305 || 0);
                ws.cell(rowIndex, 20).number(record.lactancia5A305 || 0);
                ws.cell(rowIndex, 21).number(record.produccionDiaria || 0);
                ws.cell(rowIndex, 22).number(record.promedioProduccionDiaria || 0);
                rowIndex++;
            });
    
            // Agregar estadísticas
            const produccionesTotales = leches.map(record => record.produccionTotal);
            const media = mean(produccionesTotales);
            const desviacionEstandar = std(produccionesTotales);
            const maximo = max(produccionesTotales);
            const minimo = min(produccionesTotales);
    
            ws.cell(rowIndex, 1).string('Estadísticas');
            ws.cell(rowIndex + 1, 1).string('Media');
            ws.cell(rowIndex + 1, 2).number(media);
            ws.cell(rowIndex + 2, 1).string('Desviación Estándar');
            ws.cell(rowIndex + 2, 2).number(desviacionEstandar);
            ws.cell(rowIndex + 3, 1).string('Máximo');
            ws.cell(rowIndex + 3, 2).number(maximo);
            ws.cell(rowIndex + 4, 1).string('Mínimo');
            ws.cell(rowIndex + 4, 2).number(minimo);
    
            // Ajustar ancho de las celdas
            headingColumnNames.forEach((_, index) => {
                ws.column(index + 1).setWidth(200 / 8.43); // 200 píxeles convertido a ancho de columna (1 unidad = 8.43 píxeles)
            });
    
            wb.write('ReporteLeche.xlsx', res);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
}

export default new LecheController();
