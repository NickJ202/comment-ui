import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	max-width: 600px;
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
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 20px;
`;

export const AHeader = styled.div`
	span {
		font-size: 14px;
		font-weight: 400;
		color: #666666;
	}
	p {
		margin: 7.5px 0 0 0;
		font-size: 18px;
		line-height: 1.75;
		font-weight: 400;
	}
`;

export const Asset = styled.div`
	height: 200px;
	width: 200px;
`;

export const CWrapper = styled.div`
	padding: 12.5px 0 0 0;
	border-top: 1px solid #D3D3D3;
	margin: 20px 0 0 0;
`;

export const Comment = styled.div`
	margin: 10px 0 0 0;
	p {
		font-size: 18px;
		line-height: 1.75;
		font-weight: 500;
	}
`;
