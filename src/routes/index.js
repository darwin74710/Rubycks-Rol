import { Router } from 'express'
import {config} from 'dotenv'
import pg from 'pg'

config()

const router = Router()
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

router.get('/', (req, res) =>res.render('index', {title: 'First web with Node'}))
router.get('/about', (req, res) => res.render('about', {title: 'About Me'}))
router.get('/contact', (req, res) => res.render('contact', {title: 'Contact Page'}))

router.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
})

export default router