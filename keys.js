console.log('keys are loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.omdb = {
    apiKey:process.env.omdbApiKey
};
exports.bandsInTown={
  appId:process.env.bandsInTownId
}