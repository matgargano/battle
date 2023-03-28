import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BattlerSingle from './BattlerSingle';
import { BATTLE_CHARACTER, ENEMY, PLAYER } from '../constants/constants';
import { getRandom, promiseTimeout } from '../utils/utils';
import {
	enemyAttack,
	playerAttack,
	addLog,
} from '../features/score/scoreSlice';
import Log from './Log';

const Battle = () => {
	const {
		enemyScore,
		playerScore,
		playerName,
		enemyName,
		playerAvatar,
		enemyAvatar,
		winner,
		log,
	} = useSelector((e) => e.score);

	const [attacking, setAttacking] = useState(false);
	const [playerBeingAttacked, setPlayerBeingAttacked] = useState(false);
	const [enemyBeingAttacked, setEnemyBeingAttacked] = useState(false);
	const dispatch = useDispatch();

	const reset = () => {
		setAttacking(false);
		setEnemyBeingAttacked(false);
		setPlayerBeingAttacked(false);
	};

	const attack = async () => {
		if (attacking) {
			return;
		}
		const damageToPlayer = getRandom(15);
		const damageToEnemy = getRandom(15);
		dispatch(enemyAttack(damageToPlayer));
		setAttacking(true);
		setPlayerBeingAttacked(BATTLE_CHARACTER);
		dispatch(
			addLog(`${ENEMY} attacks, deals ${damageToPlayer} damage to ${PLAYER}.`)
		);
		if (playerScore - damageToPlayer <= 0) {
			await promiseTimeout(1000);
			dispatch(addLog(`${ENEMY} defeats ${PLAYER}.`));
			reset();
			return;
		}
		await promiseTimeout(2000);

		dispatch(playerAttack(damageToEnemy));
		setPlayerBeingAttacked(false);
		setEnemyBeingAttacked(BATTLE_CHARACTER);
		dispatch(
			addLog(`${PLAYER} attacks, deals ${damageToEnemy} damage to ${ENEMY}.`)
		);
		if (enemyScore - damageToEnemy <= 0) {
			await promiseTimeout(1000);
			dispatch(addLog(`${PLAYER} defeats ${ENEMY}.`));

			reset();
			return;
		}
		await promiseTimeout(2000);

		setEnemyBeingAttacked(false);
		setAttacking(false);
	};

	return (
		<>
			<h1 className="text-center my-5">Battle!</h1>
			<div className="flex items-center justify-center gap-5 my-5">
				<BattlerSingle
					loser={!attacking && winner === ENEMY}
					beingAttacked={playerBeingAttacked}
					avatar={playerAvatar}
					name={playerName}
					score={playerScore}
				></BattlerSingle>

				<BattlerSingle
					loser={!attacking && winner === PLAYER}
					beingAttacked={enemyBeingAttacked}
					avatar={enemyAvatar}
					name={enemyName}
					score={enemyScore}
				></BattlerSingle>
			</div>
			{!winner && (
				<p className="text-center">
					<span
						onClick={attack}
						role="button"
						className={`button ${attacking && 'disabled'}`}
					>
						Attack
					</span>
				</p>
			)}

			<Log log={log}></Log>
		</>
	);
};

export default Battle;
