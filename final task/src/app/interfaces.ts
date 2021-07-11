export interface Word {
	audio: string;
	audioExample: string;
	audioMeaning: string;
	group: number;
	id: string;
	image: string;
	page: number;
	textExample: string;
	textExampleTranslate: string;
	textMeaning: string;
	textMeaningTranslate: string;
	transcription: string;
	word: string;
	wordTranslate: string;
	wordsPerExampleSentence: number;
}

export interface StatisticsDay {
	date: string;
	rightWords: number;
	wrongWords: number;
}

export interface Statistics {
	learnedWords: number;
	optional: {
		statistics: {
			array: StatisticsDay[]
		}
	};
}

export interface User {
	email: string;
	name?: string;
	username?: string;
	password: string;
}

export interface LoggedObject {
	message: string;
	name: string;
	refreshToken: string;
	token: string;
	userId: string;
}

export interface UsernameObject {
	email: string;
	id: string;
	name: string;
}
