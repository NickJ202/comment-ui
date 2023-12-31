import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	border: 1px solid #D3D3D3;
	border-radius: 2.5px;
	overflow: hidden;
`;

export const Header = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: end;
    padding 0 0 0 2.5px;
`;

export const Header1 = styled.h2`
	font-size: 20px;
	font-weight: 200;
	margin: 0;
`;

export const Frame = styled.iframe`
	height: 100%;
	width: 100%;
	scrollbar-width: none;
`;

export const FramePreview = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	svg {
		height: 100px;
		width: 100px;
		max-height: 75%;
		max-width: 75%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

export const AudioWrapper = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	svg {
		height: 75px;
		width: 75px;
		max-height: 50%;
		max-width: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const Audio = styled.audio`
	height: 50px;
	width: calc(100% - 40px);
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translate(-50%, 0);
`;

export const Video = styled.video`
	height: 100%;
	width: 100%;
	background: #000000;
`;

export const Preview = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	svg {
		height: 57.5px;
		width: 57.5px;
		max-height: 50%;
		max-width: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const UnsupportedWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	svg {
		height: 75px;
		width: 75px;
		max-height: 50%;
		max-width: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;
