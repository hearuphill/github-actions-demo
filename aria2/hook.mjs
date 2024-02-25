import 'zx/globals'

const [gid, count, filepath] = process.argv.slice(3)

const files = await jsonrpc('aria2.getFiles', [gid])

const paths = files.map((file) => file.path)

for (const path of paths) {
    await retry(
        5,
        expBackoff(),
        () =>
            $`aliyunpan u ${path} /aria2/${path
                .replace('./download/', '')
                .split('/')
                .slice(0, -1)
                .join('/')}`
    )

    await $`rm ${path}`
}

async function jsonrpc(method, params = []) {
    const { result, error } = await fetch('http://127.0.0.1:6800/jsonrpc', {
        method: 'POST',
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: Math.random().toString().slice(2),
            method,
            params,
        }),
    }).then((res) => res.json())

    if (error) throw new Error(error.message)
    return result
}
