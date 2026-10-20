const crypto = require('crypto');

const byToken = new Map();
const bySid = new Map();
const nameOwner = new Map();   // lowercase name -> token
let counter = 0;

function checkName(raw, ownToken) {
  const name = String(raw || '').trim();
  if (!/^[A-Za-z0-9_]{3,14}$/.test(name)) {
    return { error: 'Username 3-14 characters ka ho (letters, numbers, _)' };
  }
  const owner = nameOwner.get(name.toLowerCase());
  if (owner && owner !== ownToken) return { error: 'Ye username kisi aur ne le liya hai' };
  return { name };
}

function create(sid, name) {
  const p = {
    token: crypto.randomBytes(12).toString('hex'),
    pid: 'p' + ++counter,
    name, sid,
    lobbyCode: null, slotIdx: -1, timer: null, pool: false,
  };
  byToken.set(p.token, p);
  bySid.set(sid, p);
  nameOwner.set(name.toLowerCase(), p.token);
  return p;
}

function rename(p, name) {
  nameOwner.delete(p.name.toLowerCase());
  p.name = name;
  nameOwner.set(name.toLowerCase(), p.token);
}

function attach(p, sid) {
  if (p.sid) bySid.delete(p.sid);
  p.sid = sid;
  bySid.set(sid, p);
}

function detach(p) {
  if (p.sid) bySid.delete(p.sid);
  p.sid = null;
}

function remove(p) {
  detach(p);
  byToken.delete(p.token);
  if (nameOwner.get(p.name.toLowerCase()) === p.token) nameOwner.delete(p.name.toLowerCase());
}

module.exports = {
  checkName, create, rename, attach, detach, remove,
  get: (token) => byToken.get(token),
  bySid: (sid) => bySid.get(sid),
};