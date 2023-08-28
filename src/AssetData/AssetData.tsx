import React from 'react';
import { ReactSVG } from 'react-svg';

import audioSVG from 'assets/audio.svg';
import rendererSVG from 'assets/renderer.svg';
import unsupportedSVG from 'assets/unsupported.svg';
import { fetchAPI } from 'helpers/utils';

import * as S from './styles';
import { IProps } from './types';

const ASSETS = {
	audio: audioSVG,
	renderer: rendererSVG,
	unsupported: unsupportedSVG,
};

export default function AssetData(props: IProps) {
	const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

	const [asset, setAsset] = React.useState<any>(null);
	const [assetRender, setAssetRender] = React.useState<AssetRenderType | null>(null);

	const [loadError, setLoadError] = React.useState<boolean>(false);

	const handleError = () => {
		setLoadError(true);
	};

	React.useEffect(() => {
		(async function () {
			if (props.id) {
				try {
					const query = {
						query: `
							query {
								transactions(
									ids: ${JSON.stringify(props.id)},
								){
									edges {
										cursor
										node {
											id
											tags {
												name 
												value 
											}
										}
									}
								}
							}
						`,
					};

					let apiResponse = await fetchAPI({ query: query, endpoint: 'https://node2.bundlr.network/graphql' });
					if (apiResponse.data && apiResponse.data.transactions && !(apiResponse.data.transactions.edges.length)) {
						apiResponse = await fetchAPI({ query: query, endpoint: 'https://arweave.net/graphql' });
					}
					if (apiResponse.data && apiResponse.data.transactions && apiResponse.data.transactions.edges.length) {
						const tags = apiResponse.data.transactions.edges[0].node.tags;
						const title = tags.find((tag: any) => tag.name === 'Title');
						const renderWith = tags.find((tag: any) => tag.name === 'Render-With');

						props.handleUpdate(apiResponse.data.transactions.edges[0].node.id, title.value);

						setAsset({
							data: {
								id: props.id,
								title: title.value,
								renderWith: renderWith ? renderWith.value : 'N/A',
							},
						});
					}
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [props.id]);

	React.useEffect(() => {
		(async function () {
			if (asset) {
				const renderWith = asset.data?.renderWith && asset.data.renderWith !== 'N/A' ? asset.data.renderWith : '[]';
				let parsedRenderWith: string | null = null;
				try {
					parsedRenderWith = JSON.parse(renderWith);
				} catch (e: any) {
					parsedRenderWith = renderWith;
				}
				if (parsedRenderWith && parsedRenderWith.length) {
					setAssetRender({
						url: getRendererEndpoint(parsedRenderWith, asset.data.id),
						type: 'renderer',
						contentType: 'renderer',
					});
				} else {
					const assetResponse = await fetch(getTxEndpoint(asset.data.id));
					const contentType = assetResponse.headers.get('content-type');
					if (assetResponse.status === 200 && contentType) {
						setAssetRender({
							url: assetResponse.url,
							type: 'raw',
							contentType: contentType as ContentType,
						});
					}
				}
			}
		})();
	}, [asset]);

	function getUnsupportedWrapper() {
		return (
			<S.UnsupportedWrapper>
				<ReactSVG src={ASSETS.unsupported} />
			</S.UnsupportedWrapper>
		);
	}

	function getData() {
		if (assetRender) {
			switch (assetRender.type) {
				case 'renderer':
					if (!props.preview) {
						return props.loadRenderer || props.autoLoad ? (
							<S.Frame
								ref={iframeRef}
								src={assetRender.url}
								allowFullScreen
								onLoad={() => {
									if (iframeRef.current && iframeRef.current.contentWindow && props.frameMinHeight) {
										iframeRef.current.contentWindow.postMessage(
											{ type: 'setHeight', height: `${props.frameMinHeight}px` },
											'*'
										);
									}
								}}
							/>
						) : (
							<S.FramePreview>
								<ReactSVG src={ASSETS.renderer} />
							</S.FramePreview>
						);
					} else {
						return (
							<S.Preview>
								<ReactSVG src={ASSETS.renderer} />
							</S.Preview>
						);
					}
				case 'raw':
					if (loadError) {
						return getUnsupportedWrapper();
					}
					if (assetRender.contentType.includes('image')) {
						return <S.Image src={assetRender.url} onError={handleError} />;
					}
					if (assetRender.contentType.includes('audio')) {
						return (
							<S.AudioWrapper>
								<ReactSVG src={ASSETS.audio} />
								<S.Audio controls onError={handleError}>
									<source src={assetRender.url} type={assetRender.contentType} />
								</S.Audio>
							</S.AudioWrapper>
						);
					}
					if (assetRender.contentType.includes('video')) {
						return (
							<S.Video controls onError={handleError}>
								<source src={assetRender.url} type={assetRender.contentType} />
							</S.Video>
						);
					} else {
						return getUnsupportedWrapper();
					}
				default:
					return getUnsupportedWrapper();
			}
		}
	}

	return <S.Wrapper>{getData()}</S.Wrapper>;
}

function getRendererEndpoint(renderWith: string, tx: string) {
	return `https://${renderWith}.arweave.dev/?tx=${tx}`;
}

function getTxEndpoint(txId: string) {
	return `https://arweave.net/${txId}`;
}

type ContentType = 'renderer' | any;

type RenderType = 'renderer' | 'raw';
type AssetRenderType = {
	url: string;
	type: RenderType;
	contentType: ContentType;
};
