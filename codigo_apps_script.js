// ============================================================
//  Cole este código no Google Apps Script
//  Planilha > Extensões > Apps Script
//  Depois: Implantar > Gerenciar implantações > NOVA versão
//  "Executar como": sua conta | "Acesso": Qualquer pessoa
// ============================================================

const SHEET_NAME = "Notas";

function doGet(e) {
  const action = e.parameter.action;
  if (action === "list")   return jsonResponse(listNotes());
  if (action === "add")    return jsonResponse(addNote(e.parameter.author, e.parameter.text));
  if (action === "delete") return jsonResponse(deleteNote(e.parameter.id));
  return jsonResponse({ error: "Ação inválida" });
}

function doPost(e) {
  return doGet(e);
}

function listNotes() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  return rows.slice(1).map(r => ({
    id: r[0], author: r[1], text: r[2], ts: r[3]
  })).filter(n => n.id !== "");
}

function addNote(author, text) {
  if (!author || !text) return { error: "Dados incompletos" };
  const sheet = getSheet();
  const id = Utilities.getUuid();
  const ts = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  sheet.appendRow([id, author, text, ts]);
  return { success: true, id: id };
}

function deleteNote(id) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === id) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { error: "Nota não encontrada" };
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["id", "autor", "texto", "data"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
