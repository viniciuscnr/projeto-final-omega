import { Injectable } from '@nestjs/common'

@Injectable()
export class SessionService {

    private sessions: string[] = []

    add(email: string) {
        if (this.exists(email)) return
        this.sessions.push(email)
    }

    remove(email: string) {
        var index = this.sessions.findIndex((session) => session == email)
        this.sessions.splice(index, 1)
    }

    exists(email: string): boolean {
        return this.sessions.some((session) => session == email)
    }
}