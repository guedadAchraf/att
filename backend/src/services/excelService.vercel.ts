import ExcelJS from 'exceljs';
import { prisma } from '../lib/prisma';

export async function generateOrUpdateExcelFile(
  form: any,
  newSubmissions: any[],
  user: any
) {
  console.log('🔄 Début de la génération Excel VERCEL');
  console.log('📊 Formulaire:', form.name);
  console.log('📊 Nouvelles soumissions:', newSubmissions.length);
  console.log('👤 Utilisateur:', user.email);

  try {
    // Vérifier version existante
    const existingFile = await prisma.excelFile.findFirst({
      where: { formId: form.id, ownerId: user.id },
      orderBy: { version: 'desc' }
    });

    const newVersion = existingFile ? existingFile.version + 1 : 1;
    console.log('📄 Version:', newVersion);

    // Créer le workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(form.name);

    console.log('📋 Worksheet créé');

    // Configurer les colonnes
    const columns = form.fields.map((field: any) => ({
      header: field.label,
      key: `field_${field.id}`,
      width: 25
    }));

    worksheet.columns = columns;
    console.log('📊 Colonnes configurées:', columns.length);

    // Styliser l'en-tête
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 25;

    // Ajouter des bordures à l'en-tête
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'thick' },
        left: { style: 'thick' },
        bottom: { style: 'thick' },
        right: { style: 'thick' }
      };
    });

    console.log('🎨 En-tête stylisé');

    // Ajouter les données (nouvelles soumissions en premier pour versioning)
    console.log('📝 Ajout des nouvelles données...');
    newSubmissions.forEach((submission, index) => {
      console.log(`  - Traitement soumission ${index + 1}`);
      
      const rowData: any = {};
      form.fields.forEach((field: any) => {
        const submissionData = submission.data as Record<string, string>;
        const value = submissionData ? submissionData[field.id.toString()] || '' : '';
        rowData[`field_${field.id}`] = value;
      });

      const dataRow = worksheet.addRow(rowData);
      
      // Styliser les nouvelles données (vert clair)
      dataRow.font = { size: 10 };
      dataRow.alignment = { vertical: 'middle', horizontal: 'left' };
      dataRow.height = 20;
      dataRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE8F5E8' } // Vert très clair pour les nouvelles données
      };

      dataRow.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    console.log('✅ Nouvelles données ajoutées');

    // Ajuster automatiquement la largeur des colonnes
    worksheet.columns.forEach(column => {
      if (column.width && column.width < 15) {
        column.width = 15;
      } else if (!column.width) {
        column.width = 20;
      }
    });

    // Générer le buffer au lieu de sauvegarder sur le disque
    const buffer = await workbook.xlsx.writeBuffer();
    
    // Générer le nom de fichier
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${form.name}_v${newVersion}_${timestamp}.xlsx`;

    console.log('💾 Buffer généré:', fileName);

    // Enregistrer en DB avec un indicateur de buffer
    const excelFile = await prisma.excelFile.create({
      data: {
        fileName,
        filePath: `buffer://${fileName}`, // Indicateur que le fichier est en mémoire
        ownerId: user.id,
        formId: form.id,
        version: newVersion,
        submissionsCount: newSubmissions.length
      }
    });

    console.log('✅ Enregistré en DB, ID:', excelFile.id);

    return {
      excelFile,
      buffer, // Retourner le buffer pour téléchargement direct
      isNewVersion: existingFile !== null,
      previousVersion: existingFile?.version || 0,
      newEntriesCount: newSubmissions.length,
      totalEntriesCount: newSubmissions.length
    };

  } catch (error) {
    console.error('❌ ERREUR EXCEL VERCEL:', error);
    throw error;
  }
}