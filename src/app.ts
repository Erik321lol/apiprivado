import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors'; // Importa el paquete CORS

// Routes
import IndexRoutes from './routes/index.routes';
import PostRoutes from './routes/post.routes';
import UsuarioRoutes from './routes/user.routes';
import ProyectoRoutes from './routes/proyectos.routes'

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());

        // Configura CORS para permitir solicitudes desde cualquier origen
        this.app.use(cors()); // Permite solicitudes CORS

        // O para permitir solo desde un origen específico
        // this.app.use(cors({
        //     origin: 'http://127.0.0.1:5500' // Cambia esta URL según sea necesario
        // }));
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/posts', PostRoutes);
        this.app.use('/usuario', UsuarioRoutes);
        this.app.use('/privado', ProyectoRoutes);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}
