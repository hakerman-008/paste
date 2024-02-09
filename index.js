app.get('/gist', async (req, res) => {
    try {
        const userContent = req.query.content;

        if (!userContent) {
            return res.status(400).json({ error: 'User content is required' });
        }

        const response = await octokit.request('POST /gists', {
            description: 'Gist created through API',
            public: false,
            files: {
                'content.txt': {
                    content: userContent
                }
            },
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

      
        const rawUrl = response.data.files['content.txt'].raw_url;

        return res.json({ rawUrl });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
