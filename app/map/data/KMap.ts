import { KMap as KMapType } from "../../app.d.ts";

export default class KMap implements KMapType {
	id;
	parentId;
	rootId;
	topicId;
	isRoot;
	isRecap;
	name;
	importance;
	levels;
	difficulty;
	position;
	notabene;
	text;
	questions;
	//counter;
	maps;

	constructor(parentId, rootId, isRecap, name, importance, difficulty, position, notabene, text, questions) {
		this.parentId = parentId;
		this.rootId = rootId;
		this.isRecap = isRecap;
		this.name = name;
		this.importance = importance;
		this.difficulty = difficulty;
		this.position = position;
		this.notabene = notabene;
		this.text = text;
		this.questions = questions;
	}
}