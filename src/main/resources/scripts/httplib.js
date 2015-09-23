(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var parseHeaders, parseRequest, parseRequestLine, parseResponse, parseStatusLine;

parseRequest = function(requestString) {
  var headerLines, line, lines, parsedRequestLine, request;
  request = {};
  lines = requestString.split('\r\n');
  parsedRequestLine = parseRequestLine(lines.shift());
  request['method'] = parsedRequestLine['method'];
  request['uri'] = parsedRequestLine['uri'];
  headerLines = [];
  while (lines.length > 0) {
    line = lines.shift();
    if (line === "") {
      break;
    }
    headerLines.push(line);
  }
  request['headers'] = parseHeaders(headerLines);
  request['body'] = lines.join('\r\n');
  return request;
};

parseResponse = function(responseString) {
  var headerLines, line, lines, parsedStatusLine, response;
  response = {};
  lines = responseString.split('\r\n');
  parsedStatusLine = parseStatusLine(lines.shift());
  response['protocolVersion'] = parsedStatusLine['protocol'];
  response['statusCode'] = parsedStatusLine['statusCode'];
  response['statusMessage'] = parsedStatusLine['statusMessage'];
  headerLines = [];
  while (lines.length > 0) {
    line = lines.shift();
    if (line === "") {
      break;
    }
    headerLines.push(line);
  }
  response['headers'] = parseHeaders(headerLines);
  response['body'] = lines.join('\r\n');
  return response;
};

parseHeaders = function(headerLines) {
  var headers, key, line, parts, _i, _len;
  headers = {};
  for (_i = 0, _len = headerLines.length; _i < _len; _i++) {
    line = headerLines[_i];
    parts = line.split(":");
    key = parts.shift();
    headers[key] = parts.join(":").trim();
  }
  return headers;
};

parseStatusLine = function(statusLine) {
  var parsed, parts;
  parts = statusLine.match(/^(.+) ([0-9]{3}) (.*)$/);
  parsed = {};
  if (parts !== null) {
    parsed['protocol'] = parts[1];
    parsed['statusCode'] = parts[2];
    parsed['statusMessage'] = parts[3];
  }
  return parsed;
};

parseRequestLine = function(requestLineString) {
  var parsed, parts;
  parts = requestLineString.split(' ');
  parsed = {};
  parsed['method'] = parts[0];
  parsed['uri'] = parts[1];
  parsed['protocol'] = parts[2];
  return parsed;
};

module.exports.parseRequest = parseRequest;

module.exports.parseResponse = parseResponse;

module.exports.parseRequestLine = parseRequestLine;

module.exports.parseStatusLine = parseStatusLine;

module.exports.parseHeaders = parseHeaders;

},{}],2:[function(require,module,exports){
window.httplib = require('http-string-parser');

},{"http-string-parser":1}]},{},[2]);