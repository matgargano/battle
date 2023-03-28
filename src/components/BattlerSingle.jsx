import { BATTLE_CHARACTER } from '../constants/constants';

const BattlerSingle = ({ avatar, name, score, beingAttacked, loser }) => {
	return (
		<div className="space-battler relative">
			<div className="relative">
				{loser && <span className="lost">{BATTLE_CHARACTER}</span>}
				{beingAttacked && <span className="attacking">{beingAttacked}</span>}
				<img src={avatar} alt={name} className="battler-image" />
			</div>
			<p className="text-center">{name}</p>
			<p className="text-center">Score: {score}</p>
		</div>
	);
};

export default BattlerSingle;
