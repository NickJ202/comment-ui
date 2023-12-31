export interface IProps {
	id: string;
	preview?: boolean;
	frameMinHeight?: number;
	autoLoad?: boolean;
	loadRenderer?: boolean;
	handleUpdate: (id: string, title: string) => void;
}
