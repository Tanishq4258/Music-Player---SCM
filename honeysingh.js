const audio = document.getElementById('audio');
   const playPauseBtn = document.getElementById('play-pause');
   const progressBar = document.getElementById('progress-bar');
   const currentTimeElem = document.getElementById('current-time');
   const durationElem = document.getElementById('duration');
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
        title: "Dope Shope",
        artist: "Yo Yo Honey Singh",
        src: "songs/Honey Singh/Dope Shope International Villager 320 Kbps.mp3", 
        cover: "songs/Honey Singh/IMG/dope shope, brown munde.jpg"
    },
    {
        title: "Chaska",
        artist: "Yo Yo Honey Singh",
        src: "songs/Honey Singh/Chaska.mp3",
        cover: "songs/Honey Singh/IMG/chaska.jpg"
    },
    {
        title: "Blue Eyes",
        artist: "Yo Yo Honey Singh",
        src: "songs/Honey Singh/Blue Eyes Yo Yo Honey Singh 320 Kbps.mp3", 
        cover: "songs/Honey Singh/IMG/blue eyes.jpg"
    },
    {
        title: "Love Dose",
        artist: "Yo Yo Honey Singh",
        src: "songs/Honey Singh/Love Dose - Desi Kalakaar 320 Kbps.mp3",
        cover: "songs/Honey Singh/IMG/love dose.jpg"
    },  
    {
        title: "Brown Rang",
        artist: "Yo Yo Honey Singh",
        src: "songs/Honey Singh/Brown Rang International Villager 320 Kbps.mp3",
        cover: "songs/Honey Singh/IMG/dope shope, brown munde.jpg"
    },
    {
        title: "This Party's Getting Hot",
        artist: "Yo Yo Honey Singh",
        src: "songs/Honey Singh/This Party Getting Hot.mp3",
        cover: "songs/Honey Singh/IMG/this partys getting hot.jpg"
    },
    {
        title: "Millionaire",
        artist: "Yo Yo Honey Singh",
        src: "songs/Millionaire.mp3",
        cover: "millionaire.jpg"
    },
    {
        title: "Hot Shit",
        artist: "Arjan Dhillon",
        src: "songs/Hot Shit.mp3",
        cover: "hot shit.jpg"
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
        title: "Lalkara",
        artist: "Diljit Dosanjh",
        src: "songs/Lalkara.mp3",
        cover: "lalkara.jpg"
    },
    {
        title: "Ynwim",
        artist: "Karan Aujla",
        src: "songs/Ykwim.mp3",
        cover: "Ykwim.jpg"
    },
    {
        title: "Aapki Ankhon Me Kuchh",
        artist: "Kishore Kumar",
        src: "songs/Old is Gold/Aap Ki Ankhon Mein Kuch.mp3",
        cover: "songs/Old is Gold/IMG/aap ki aankhon main kuchh.jpg"
    },
    {
        title: "Chala Jata Hoon",
        artist: "Kishore Kumar",
        src: "songs/Old is Gold/Chala Jata Hoon.mp3",
        cover: "songs/Old is Gold/IMG/chala jata hoon.jpg"
    },
    {
        title: "Meri Saamne Wali Khidki pe",
        artist: "Kishore Kumar",
        src: "songs/Old is Gold/meri saamne wali khidki pe.mp3",
        cover: "songs/Old is Gold/IMG/mere saamne wali khipki pe.jpg"
    },
    {
        title: "O Mere Dil Ke Chain",
        artist: "Kishore Kumar",
        src: "songs/Old is Gold/O Mere Dil Ke Chain.mp3",
        cover: "songs/Old is Gold/IMG/o mere dil ke chain.webp"
    },
    {
        title: "Aankhon Mai Doob Jaane Ko",
        artist: "The 9Teen",
        src: "songs/Love Hits/Aankhon Mein Doob Jaane Ko.mp3",
        cover: "songs/Love Hits/IMG/aankhon mai doob jane ko.jpg"
    },
    {
        title: "Main Rang Sharbaton Ka",
        artist: "Atif Aslam",
        src: "songs/Love Hits/Main Rang Sharbaton Ka - Phata Poster Nikhla Hero 320 Kbps.mp3",
        cover: "songs/Love Hits/IMG/mai rang sharbaton ka.jpg"
    },
    {
        title: "O' Meri Laila",
        artist: "Atif Aslam",
        src: "songs/Love Hits/O Meri Laila.mp3",
        cover: "songs/Love Hits/IMG/laila.jpg"
    },
    {
        title: "Tera Hone Laga Hoon",
        artist: "Atif Aslam",
        src: "songs/Love Hits/Tera Hone Laga Hoon (1).mp3",
        cover: "songs/Love Hits/IMG/tera hone laga hoon.jpg"
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

    }
    
    
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
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    progressBar.value = (currentTime / duration) * 100;
    currentTimeElem.textContent = formatTime(currentTime);
    durationElem.textContent = formatTime(duration);
});

progressBar.addEventListener('input', () => {
    const duration = audio.duration;
    audio.currentTime = (progressBar.value / 100) * duration;
});

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
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

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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