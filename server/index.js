const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');

const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const saleRoutes = require('./routes/saleRoutes');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/purchases', purchaseRoutes);
app.use('/api/v1/sales', saleRoutes);

sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Server running in development mode on port ${PORT}..`.yellow.bold
			);
		});
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
