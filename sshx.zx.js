#!/usr/bin/env zx
import 'zx/globals'
import { stripVTControlCharacters } from 'node:util'

ntfy(`[start] ${await $`uname -a`}`)

await $`curl -sSf https://sshx.io/get | sh`

$`sshx`.stdout.on('data', (d) => {
    const out = stripVTControlCharacters(d.toString())
    note(out)
    const url = out.match(/(https:\/\/.+)/)?.[0]
    url && ntfy(url)
})

await $`curl -O https://b2.488848.xyz/bin/bore`
await $`chmod +x bore`

$`./bore local 6800 --to bore.pub`.stdout.on('data', (d) => {
    const out = stripVTControlCharacters(d.toString())
    if (!out.includes('listening at bore.pub:')) return
    ntfy(out)
    note(out, 'sshxbore')
})

//
//
//
//
//

async function ntfy(body, label = 'sshxsshx') {
    const res = await fetch(`https://ntfy.sh/${label}`, {
        method: 'POST',
        body,
    })
    return res.ok
}

async function note(body, label = 'sshxsshx') {
    const res = await fetch(`https://yieldray-notemskv.web.val.run/${label}`, {
        method: 'POST',
        body: `${new Date()}\n\n${body}`,
    })
    return res.ok
}
