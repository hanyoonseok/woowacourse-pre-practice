import { KEY } from './constants.js';

export default class Model {
  getStations() {
    return JSON.parse(localStorage.getItem(KEY.station)) || [];
  }

  setStation(value) {
    localStorage.setItem(KEY.station, JSON.stringify(value));
  }

  addStation(station) {
    const stations = this.getStations();
    stations.push(station);
    this.setStation(stations);
  }

  deleteStation(station) {
    const stations = this.getStations();
    let deletedStations = stations.filter(x => x !== station);
    this.setStation(deletedStations);
  }

  getLines() {
    return JSON.parse(localStorage.getItem(KEY.line)) || [];
  }

  setLine(value) {
    localStorage.setItem(KEY.line, JSON.stringify(value));
  }

  makeLine(name, start, end) {
    return {
      name,
      stations: [start, end],
    };
  }
  addLine(line) {
    const lines = this.getLines();
    lines.push(line);
    this.setLine(lines);
  }
  deleteLine(line) {
    const lines = this.getLines();
    let deletedLines = lines.filter(x => x.name !== line);
    this.setLine(deletedLines);
  }
  addStationInOrder(station, order, line) {
    const lines = this.getLines();
    const selectedLine = lines.find(e => e.name === line);
    selectedLine.stations.splice(order, 0, station);
    this.setLine(lines);
  }
  deleteStationInLine(line, station) {
    const lines = this.getLines();
    const selectedLine = lines.find(e => e.name === line.name);
    const deletedLine = selectedLine.stations.filter(x => x !== station)
    selectedLine.stations = deletedLine;
    this.setLine(lines);
  }
}
