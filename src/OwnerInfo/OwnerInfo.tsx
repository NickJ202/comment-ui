import React from 'react';
import { ReactSVG } from 'react-svg';

import userSVG from 'assets/user.svg';

import * as S from './styles';

const ASSETS = {
	user: userSVG,
};

export default function OwnerInfo({ owner, loading }) {
	const [hasError, setHasError] = React.useState(false);

	const handleError = () => {
		setHasError(true);
	};

	const avatar =
		!hasError && owner && owner.avatar ? (
			<img src={`https://arweave.net/${owner.avatar}`} onError={handleError} />
		) : (
			<ReactSVG src={ASSETS.user} />
		);

	return owner && !loading ? (
		<S.DCLineHeader>
			<S.AvatarWrapper>
				<S.Avatar>{avatar}</S.Avatar>
			</S.AvatarWrapper>
			<S.NoWrap>{owner && owner.handle ? owner.handle : formatAddress(owner.address, false)}</S.NoWrap>
		</S.DCLineHeader>
	) : null;
}

export function formatAddress(address: string | null, wrap: boolean) {
	if (!address) {
		return '';
	}
	const formattedAddress = address.substring(0, 5) + '...' + address.substring(36, address.length - 1);
	return wrap ? `(${formattedAddress})` : formattedAddress;
}
