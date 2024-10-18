export interface Topic {
  id: number;
  username: string;
  name: string;
  maps: KMap[];
}

export interface KMap {
  id: number;
  username: string;
  parentId: number;
  rootId: number;
  topicId: number;
  isRoot: boolean;
  isPublic: boolean;
  isRecap: boolean;
  name: string;
  importance: 1 | 2 | 3 | 4; // essential - 1, important - 2, goodtoknow - 3, rare - 4
  levels: number; // number of contained map levels
  difficulty: 0 | 1 | 2 ; // default 0 - not difficult; 1 - medium, 2 - high difficulty 
  position: number; // manually set order of the map in the list of child maps
  notabene: boolean; // mark something of importance with a ! sign
  text: string;
  questions: string;
  counter: number; // number of chil;d maps
  maps: KMap[];
}

export interface MapDisplaySettings {
  displayImportance: 1 | 2 | 3 | 4;
  displayLevels: 1 | 2 | 100; // "100" means "all"
}

export interface MapControlData {
  map: KMap;
  type: "add" | "edit" | "delete";
}