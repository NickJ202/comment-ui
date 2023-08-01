import React from 'react';
import ReactDOM from 'react-dom/client';
import { AssetData } from 'AssetData';
import { OwnerInfo } from 'OwnerInfo';

import { fetchAPI } from 'helpers/utils';

import * as S from './styles';

function App() {
	const queryParam = parseQuery(window.location.search);

	const [comment, setComment] = React.useState<{ text: string; dataSource: string; owner: any } | null>(null);
	const [dataSourceTitle, setDataSourceTitle] = React.useState<string | null>(null);

	React.useEffect(() => {
		(async function () {
			if (queryParam.tx) {
				try {
					const txQuery = {
						query: `
							query {
								transactions(
									ids: ${JSON.stringify(queryParam.tx)},
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

					const endpoint = 'https://node2.bundlr.network/graphql';
					const txResponse = await fetchAPI({ query: txQuery, endpoint: endpoint });

					if (txResponse.data && txResponse.data.transactions && txResponse.data.transactions.edges.length) {
						const tags = txResponse.data.transactions.edges[0].node.tags;
						const commentText = tags.find((tag: any) => tag.name === 'Description');
						const dataSource = tags.find((tag: any) => tag.name === 'Data-Source');
						const initialOwner = tags.find((tag: any) => tag.name === 'Initial-Owner');

						const ownerQuery = {
							query: `
								query {
									transactions(
										owners: ${JSON.stringify(initialOwner.value)}
										tags: [{name: "Protocol-Name", values: ["Account-0.2", "Account-0.3"]}]
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

						let finalProfile: any = null;
						const ownerResponse = await fetchAPI({ query: ownerQuery, endpoint: endpoint });
						if (ownerResponse.data && ownerResponse.data.transactions && ownerResponse.data.transactions.edges.length) {
							const ownerData = await fetch(`https://arweave.net/${ownerResponse.data.transactions.edges[0].node.id}`);
							if (ownerData.status === 200) {
								let fetchedProfile: any = await ownerData.text();
								fetchedProfile = JSON.parse(fetchedProfile);
								finalProfile = {
									handle: fetchedProfile.handle ? fetchedProfile.handle : null,
									avatar: fetchedProfile.avatar ? fetchedProfile.avatar : null,
									twitter: fetchedProfile.links.twitter ? fetchedProfile.links.twitter : null,
									discord: fetchedProfile.links.discord ? fetchedProfile.links.discord : null,
									walletAddress: initialOwner.value,
								};
							} else {
								finalProfile = {
									handle: null,
									avatar: null,
									twitter: null,
									discord: null,
									walletAddress: initialOwner.value,
								};
							}
						}

						setComment({
							text: commentText ? commentText.value : '',
							dataSource: dataSource ? dataSource.value : '',
							owner: finalProfile,
						});
					}
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, []);

	console.log(comment);

	function getComment() {
		if (comment) {
			return (
				<>
					<S.AWrapper>
						{dataSourceTitle && (
							<S.AHeader>
								<span>Comment on</span>
								<p>{dataSourceTitle}</p>
							</S.AHeader>
						)}
						<S.Asset>
							<AssetData id={comment.dataSource} handleUpdate={(title: string) => setDataSourceTitle(title)} />
						</S.Asset>
					</S.AWrapper>
					<S.CWrapper>
						<OwnerInfo owner={comment.owner} loading={false} />
						<S.Comment>
							<p>{comment.text}</p>
						</S.Comment>
					</S.CWrapper>
				</>
			);
		} else return <p>Loading...</p>;
	}

	return queryParam.tx ? <S.Wrapper>{getComment()}</S.Wrapper> : null;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

function parseQuery(queryString: string) {
	return (queryString[0] === '?' ? queryString.substr(1) : queryString)
		.split('&')
		.reduce((query: any, pair: string) => {
			const [key, value] = pair.split('=');
			query[decodeURIComponent(key)] = decodeURIComponent(value || '');
			return query;
		}, {});
}
