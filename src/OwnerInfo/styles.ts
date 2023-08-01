import styled from 'styled-components';

export const DCLineHeader = styled.div`
	display: flex;
	align-items: center;
	p {
		font-size: 14px;
		line-height: 1.5;
		font-weight: 500;
		color: #3A3A3A;
		word-wrap: break-word;
	}
`;

export const NoWrap = styled.p`
	overflow-x: hidden;
	word-wrap: normal !important;
	white-space: nowrap;
	text-overflow: ellipsis;
	@media (max-width: 540px) {
		max-width: 100px;
	}
`;

export const OLoader = styled.div`
	height: 15px;
	width: 60px;
	border: 1px solid #D3D3D3;
	border-radius: 7.5px;
	overflow: hidden;
`;

export const AvatarWrapper = styled.div`
	position: relative;
`;

export const ALink = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	height: 22.5px;
	width: 22.5px;
	border-radius: 50%;
	background: rgba(0, 0, 0, 0.5)
	opacity: 0;
	transition: ease 200ms;
	&:hover {
		opacity: 1;
	}
	a {
		display: block;
		height: 100%;
		width: 100%;
	}
`;

export const Avatar = styled.div`
	height: 22.5px;
	width: 22.5px;
	margin: 0 8.5px 0 0;
	border-radius: 50%;
	border: 1px solid #D3D3D3;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		height: 100%;
		width: 100%;
	}
	svg {
		height: 16.5px;
		width: 16.5px;
		padding: 3.5px 0 0 0px;
		margin: 0 0 2.5px 0;
		stroke: #3A3A3A
	}
`;

export const OrderCancel = styled.div`
	margin: 0 0 0 5px;
`;
