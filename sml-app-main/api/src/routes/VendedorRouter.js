const { Router } = require('express');
const {
	postVendedorHandler,
	getAllVendedoresHandler,
	getVendedorByNameHandler,
	getVendedorByIdHandler,
	updateVendedorHandler,
	getVendedorByEmailHandler,
	getVendedorVentasByEmailHandler
} = require('../Handlers/VendedoresHandlers');
const VendedorRouter = Router();

VendedorRouter.post('/', postVendedorHandler);
VendedorRouter.get('/', getAllVendedoresHandler);
VendedorRouter.get('/name', getVendedorByNameHandler);
VendedorRouter.get('/email', getVendedorByEmailHandler);
VendedorRouter.get('/ventas/email', getVendedorVentasByEmailHandler);
VendedorRouter.get('/:id', getVendedorByIdHandler);
VendedorRouter.put('/:id', updateVendedorHandler);

module.exports = VendedorRouter;
