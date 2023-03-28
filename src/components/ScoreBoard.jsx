import { useDispatch, useSelector } from 'react-redux';
import { ENEMY, PLAYER } from '../constants/constants';
import { resetSlice } from '../features/score/scoreSlice';

const ScoreBoard = () => {
	const { winner, enemyScore, playerScore } = useSelector((e) => e.score);
	const dispatch = useDispatch();
	return (
		<>
			{winner && (
				<>
					<h1 className="text-center alert">
						<span>WINNER: {winner}</span>
					</h1>
					<p className="text-center">
						<span
							onClick={() => dispatch(resetSlice())}
							role="button"
							className="button"
						>
							Reset
						</span>
					</p>
				</>
			)}

			<div className="flex gap-5 justify-center z-1">
				<p>Score</p>
				<p>
					{PLAYER} {playerScore}
				</p>
				<p>
					{ENEMY} {enemyScore}
				</p>
			</div>
		</>
	);
};

export default ScoreBoard;
