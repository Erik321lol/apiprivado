import { Request, Response } from 'express'

export function indexWelcome(req: Request, res: Response): any {
   return res.json('API privado'); 
}