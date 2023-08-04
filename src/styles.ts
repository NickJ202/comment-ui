import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	margin: 0 auto;
	animation: open 500ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    padding: 20px;

	@keyframes open {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

export const AWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 15px;
`;

export const AHeader = styled.div`
	display: flex;
	align-items: center;
	a,
	span {
		font-size: 14px;
		font-weight: 400;
		color: #666666;
	}
	a {
		&:hover {
			color: #444444;
		}
	}
`;

export const Divider = styled.p`
	margin: 0 5px;
`;

export const Asset = styled.div`
	height: 20px;
	width: 20px;
`;

export const CWrapper = styled.div`
	margin: 10px 0 0 0;
`;

export const Comment = styled.div`
	p {
		font-size: 18px;
		line-height: 1.75;
		font-weight: 500;
	}
`;
