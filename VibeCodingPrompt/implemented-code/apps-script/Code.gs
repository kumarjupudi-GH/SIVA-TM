/**
 * SIVA Techno Mart: inquiry receiver (Google Apps Script web app).
 *
 * Receives JSON from the website's Contact, Training-inquiry and Idea forms
 * and appends one row per submission to the SIVA-TM-Inquiries spreadsheet
 * (Drive folder SIVA-TM / Inquiries).
 *
 * No secrets live in the website. This script runs as YOU and only ever
 * appends rows to this one spreadsheet.
 */

var SHEET_ID = '1I4oWwAz-nKgXc-Uw4kPxkO6yEG3ESSf2T4nRKvwaFfE'; // SIVA-TM-Inquiries
var SHEET_NAME = 'Sheet1'; // the tab name inside the spreadsheet

var LIMITS = { name: 120, email: 200, interest: 100, title: 200, assistance: 100, message: 5000, page: 100 };
var MAX_BODY = 20000; // characters
var KINDS = ['inquiry', 'idea'];

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > MAX_BODY) return reply_(false, 'Bad request');

    var d = JSON.parse(raw);
    if (d.website) return reply_(true); // honeypot filled: pretend success, store nothing

    var kind = String(d.kind || '');
    if (KINDS.indexOf(kind) === -1) return reply_(false, 'Bad request');

    var name = clean_(d.name, LIMITS.name);
    var email = clean_(d.email, LIMITS.email);
    var message = clean_(d.message, LIMITS.message);
    if (name.length < 2) return reply_(false, 'Name is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply_(false, 'Valid email is required');
    if (message.length < 10) return reply_(false, 'Message is required');

    var interest = clean_(d.interest, LIMITS.interest);
    var title = clean_(d.title, LIMITS.title);
    var assistance = clean_(d.assistance, LIMITS.assistance);
    if (kind === 'inquiry' && !interest) return reply_(false, 'Interest is required');
    if (kind === 'idea' && (title.length < 3 || !assistance)) return reply_(false, 'Idea title and assistance are required');

    var received = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    var row = [received, kind, name, email, interest, title, assistance, message, clean_(d.page, LIMITS.page)];

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = SpreadsheetApp.openById(SHEET_ID);
      var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0]; // fall back to the first tab
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }
    return reply_(true);
  } catch (err) {
    Logger.log('ERROR: ' + err); // shows the real cause in View > Executions
    return reply_(false, 'Server error');
  }
}

/** Opening the web-app URL in a browser shows this, so you can confirm it is deployed. */
function doGet() {
  return reply_(true, 'SIVA-TM inquiry endpoint is running');
}

/** Trim, cap the length, and defuse spreadsheet formulas (=, +, -, @ at the start). */
function clean_(value, max) {
  var s = (value === undefined || value === null) ? '' : String(value);
  s = s.replace(/\r\n/g, '\n').trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function reply_(ok, message) {
  var body = { ok: ok };
  if (message) body.message = message;
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

/** Optional: run once from the editor to check the sheet is reachable and a test row is added. */
function testAppend() {
  var res = doPost({ postData: { contents: JSON.stringify({
    kind: 'inquiry', name: 'Test Person', email: 'test@example.com',
    interest: 'Other', message: 'Test row from the Apps Script editor.', page: '#test'
  }) } });
  Logger.log(res.getContent());
}
