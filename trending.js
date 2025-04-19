const audio = document.getElementById('audio');
   const playPauseBtn = document.getElementById('play-pause');
   const progressBar = document.getElementById('progress-bar');
   const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');
   const volumeBar = document.getElementById('volume-bar');
   const prevBtn = document.getElementById('prev');
   const nextBtn = document.getElementById('next');
   const repeatBtn = document.getElementById('repeat');
   const songTitleElem = document.getElementById('song-title');
   const songArtistElem = document.getElementById('song-artist');
   const songCoverElem = document.getElementById('song-cover');
   const searchInput = document.getElementById('search-input');
//    const dropdown = document.getElementById('dropdown');
//    const dropdownList = document.getElementById('dropdown-list');

   const songs = [
   {
        title: "Born To Shine",
        artist: "Diljit Dosanjh",
        src: "songs/Born To Shine.mp3",
        cover: "mp_avatar/born to shine.jpg"
    },
    {
        title: "Be Mine",
        artist: "Shubh",
        src: "songs/Trending/Be Mine.mp3",
        cover: "songs/Trending/img/Be-Mine.jpg"
    },
    {
        title: "315",
        artist: "AP Dhillon",
        src: "songs/Trending/315.mp3",
        cover: "songs/Trending/img/315.jpg"
    },
    {
        title: "Pind De Gede",
        artist: "Rupinder Handa",
        src: "songs/Trending/Pind De Gerhe.mp3",
        cover: "songs/Trending/img/Pind de gede.jpg"
    },
    {
        title: "Noormahal",
        artist: "Channi Naten",
        src: "songs/Trending/Noormahal.mp3",
        cover: "songs/Trending/img/noormahal.webp"

    },
    {
        title: "Kaleshi Chori",
        artist: "DG IMMORTALS, Raga",
        src: "songs/Trending/KALESHI CHORI.mp3",
        cover: "songs/Trending/img/kaleshi chori.jpg"
    },
    {
        title: "Jaadugar",
        artist: "Paradox",
        src: "songs/Trending/Jaadugar.mp3",
        cover: "songs/Trending/img/jaadugar.jpg"
    },
    {
        title: "Nature",
        artist: "Kabira, Nj Nindaniya",
        src: "songs/Nature.mp3",
        cover: "nature.jpg"
    },  
    {
        title: "O' Meri Laila",
        artist: "Atif Aslam",
        src: "songs/Love Hits/O Meri Laila.mp3",
        cover: "songs/Love Hits/IMG/laila.jpg"
    },
    {
        title: "Hot Shit",
        artist: "Arjan Dhillon",
        src: "songs/Hot Shit.mp3",
        cover: "hot shit.jpg"
    },
    {
        title: "Tera Hone Laga Hoon",
        artist: "Atif Aslam",
        src: "songs/Love Hits/Tera Hone Laga Hoon (1).mp3",
        cover: "songs/Love Hits/IMG/tera hone laga hoon.jpg"
    },
    {
        title: "Lalkara",
        artist: "Diljit Dosanjh",
        src: "songs/Lalkara.mp3",
        cover: "lalkara.jpg"
    },
    {
        title: "Tu Jaane Na",
        artist: "Atif Aslam",
        src: "songs/Love Hits/Tu Jaane Na.mp3",
        cover: "songs/Love Hits/IMG/tu jaane na.jpg"
    },
    {
        title: "Tum Mile",
        artist: "Pritam, Neeraj Shridhar",
        src: "songs/Love Hits/Tum Mile Tum Mile.mp3",
        cover: "songs/Love Hits/IMG/tum mile.jpg"

    },
    {
        title: "Old Money",
        artist: "AP Dhillon",
        src: "songs/Old Money - AP Dhillon.mp3", 
        cover: "old money.jpeg"
    },
    {
        title: "Tauba Tauba",
        artist: "Karan Aujla",
        src: "songs/Tauba Tauba.mp3",
        cover: "tauba tauba.jpg"
    },
    {
        title: "Jo Tum Mere ho",
        artist: "Anuv Jain",
        src: "songs/Jo Tum Mere Ho Anuv Jain.mp3", 
        cover: "jo tum mere ho.png"
    },
    
    {
        title: "Brown Munde",
        artist: "AP Dhillon",
        src: "songs/brown munde.mp3",
        cover: "brown munde.jpg"
    },
    
    {
        title: "Millionaire",
        artist: "Yo Yo Honey Singh",
        src: "songs/Millionaire.mp3",
        cover: "millionaire.jpg"
    },
    {
        title: "We Rollin",
        artist: "Shubh",
        src: "songs/We Rollin.mp3",
        cover: "werollin.jpg"
    },
    {
        title: "Asi Gabru Punjabi",
        artist: "Amrinder Gill",
        src: "songs/Asi Gabru Punjabi.mp3",
        cover: "asi gabru punjabi.jpg"
    },
    
    {
        title: "Ynwim",
        artist: "Karan Aujla",
        src: "songs/Ykwim.mp3",
        cover: "Ykwim.jpg"
    },
    
    
];

let currentSongIndex = 0;
let isRepeating = false;

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.classList.remove('fa-play-circle');
        playPauseBtn.classList.add('fa-pause-circle');
    } else {
        audio.pause();
        playPauseBtn.classList.remove('fa-pause-circle');
        playPauseBtn.classList.add('fa-play-circle');
    }
});

audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener('input', () => {
    const duration = audio.duration;
    audio.currentTime = (progressBar.value / 100) * duration;
});

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});

audio.addEventListener('loadedmetadata', () => {
    totalDurationEl.textContent = formatTime(audio.duration);
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
});

repeatBtn.addEventListener('click', () => {
    isRepeating = !isRepeating;
    repeatBtn.classList.toggle('active', isRepeating);
});

audio.addEventListener('ended', () => {
    if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
    } else {
        nextBtn.click();
    }
});

function loadSong(song) {
    audio.src = song.src;
    songTitleElem.textContent = song.title;
    songArtistElem.textContent = song.artist;
    songCoverElem.src = song.cover;
    playPauseBtn.classList.remove('fa-play-circle');
    playPauseBtn.classList.add('fa-pause-circle');
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Load the first song initially
loadSong(songs[currentSongIndex]);

// Add event listeners to cards
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(songs[currentSongIndex]);
        audio.play();
    });
});

const dropdown = document.getElementById('dropdown');
const dropdownList = document.getElementById('dropdown-list');

// Show dropdown based on search input
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    dropdownList.innerHTML = ''; // Clear previous results

    if (searchTerm) {
        songs.forEach(song => {
            const songTitle = song.title.toLowerCase();
            const songArtist = song.artist.toLowerCase();

            if (songTitle.includes(searchTerm) || songArtist.includes(searchTerm)) {
                const li = document.createElement('li');
                li.textContent = `${song.title} - ${song.artist}`;
                li.addEventListener('click', () => {
                    currentSongIndex = songs.findIndex(s => s.title === song.title && s.artist === song.artist);
                    loadSong(songs[currentSongIndex]);
                    audio.play();
                    dropdown.style.display = 'none'; // Hide dropdown after selection
                    searchInput.value = ''; // Clear the search input
                });
                dropdownList.appendChild(li);
            }
        });

        dropdown.style.display = dropdownList.children.length > 0 ? 'block' : 'none'; // Show dropdown if there are results
    } else {
        dropdown.style.display = 'none'; // Hide dropdown if input is empty
    }
});

// Hide dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});