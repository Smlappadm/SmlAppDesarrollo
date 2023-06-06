const { Router } = require('express');
const {
	postLeaderHandler,
	getAllLeadersHandler,
	updateLeaderHandler,
	getLeaderByIdHandler,
	getLeaderByNameHandler,
	getLeaderByEmailHandler,
} = require('../Handlers/LeaderHandlers');
const LeaderRouter = Router();

LeaderRouter.post('/', postLeaderHandler);
LeaderRouter.get('/', getAllLeadersHandler);
LeaderRouter.get('/email', getLeaderByEmailHandler);
LeaderRouter.get('/name', getLeaderByNameHandler);
LeaderRouter.get('/:id', getLeaderByIdHandler);
LeaderRouter.put('/:id', updateLeaderHandler);

module.exports = LeaderRouter;
