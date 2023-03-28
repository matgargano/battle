import { createSlice } from '@reduxjs/toolkit';
import { ENEMY, PLAYER } from '../../constants/constants';
import enemyAvatar from '../../assets/blue.svg';
import playerAvatar from '../../assets/little-mac.png';

const initialState = {
	enemyScore: 3,
	playerScore: 3,
	playerName: PLAYER,
	enemyName: ENEMY,
	playerAvatar,
	enemyAvatar,
	log: [],
	winner: null,
};

const scoreSlice = createSlice({
	name: 'score',
	initialState,
	reducers: {
		addLog: (state, action) => {
			const logCopy = [...state.log];
			logCopy.push(action.payload);
			logCopy.reverse();
			state.log = logCopy;
		},
		resetSlice: () => initialState,

		enemyAttack: (state, action) => {
			const newValue = Math.max(
				parseInt(state.playerScore - parseInt(action.payload), 10),
				0
			);
			state.playerScore = newValue;
			if (newValue === 0) {
				state.winner = ENEMY;
			}
		},
		playerAttack: (state, action) => {
			const newValue = Math.max(
				parseInt(state.enemyScore, 10) - parseInt(action.payload, 10),
				0
			);
			state.enemyScore = newValue;
			if (newValue === 0) {
				state.winner = PLAYER;
			}
		},
	},
});

const { enemyAttack, playerAttack, resetSlice, addLog } = scoreSlice.actions;
export { enemyAttack, playerAttack, resetSlice, addLog };
export default scoreSlice.reducer;
