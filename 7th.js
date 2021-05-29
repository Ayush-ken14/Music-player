const music = document.querySelector("audio");
        const img = document.querySelector('img');
        const play = document.getElementById("play");
        const artist = document.getElementById("artist");
        const title = document.getElementById("title");
        const prev = document.getElementById("prev");
        const next = document.getElementById("next");
        

        let progress = document.getElementById("progress")

        let  total_duration = document.getElementById("duration");

        let current_time = document.getElementById("current_time");

        const progress_div = document.getElementById("progress_div");

        // array of an object 
        const songs =[{
            name: "1ak",
            title: "ignite",
            artist: "alen walker",
        },
        {
            name: "2ak",
            title: "lose yourself",
            artist: "eminem",
        },
        {
            name: "3ak",
            title: "treat you better",
            artist: "shawn mendes",
        },
        {
            name: "4ak",
            title: "let me down",
            artist: "Alec Benjamin",
        },
    ];

        let isplaying = false;
        // for play function 

        
        const playMusic = () => {
            isplaying = true;
            music.play();
            play.classList.replace('fa-play','fa-pause');
            img.classList.add('anime');
        };


        //    For pause function 
        const pauseMusic = () => {
            isplaying = false;
            music.pause();
            play.classList.replace('fa-pause','fa-play');
            img.classList.remove('anime');
        };
        
        play.addEventListener('click', () =>{
            if(isplaying){
                pauseMusic();
            } else{
                playMusic();
            }
        });

        //     changing the music data 

        loadsong = (songs) => {
            title.textContent = songs.title;
            artist.textContent = songs.artist;
            music.src = "music/" + songs.name + ".mp3";
            img.src = "image/" + songs.name + ".jpg";
        };

         songindex = 0;
        // loadsong(songs[1]);

        //  for next 
        const nextsong = () => {
            songindex = (songindex + 1) % songs.length;
            loadsong(songs[songindex]);
            playMusic();
        }

        //  For privious 

        const prevsong = () => {
            songindex = (songindex - 1 + songs.length) % songs.length;
            loadsong(songs[songindex]);
            playMusic();
        }




        //     progress js Work 

        music.addEventListener("timeupdate",(event) => {
        const { currentTime,duration} = event.srcElement;
            // console.log(currentTime)
            // console.log(duration);
            let progress_time = (currentTime / duration)*100;
           // console.log(progress_time);
            progress.style.width = `${progress_time}%`;


            //   music duration update

            let min_duration = Math.floor(duration/60);
            let sec_duration = Math.floor(duration %60);

               
            let tot_duration = `${min_duration}:${sec_duration}`;
            


            if(duration){
              total_duration.textContent = `${tot_duration}`;
            }


        //  current duration update

        let min_currentTime = Math.floor(currentTime/60);
        let sec_currentTime = Math.floor(currentTime %60);

        
        if( sec_currentTime < 10) {
            sec_currentTime = `0${sec_currentTime}`;
        }

        let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
        
        current_time.textContent = `${tot_currentTime}`;

        });

        //  progress onclick function

        progress_div.addEventListener('click', (event) => {
            
         console.log(event);

         const { duration } = music;

         let move_progress = 
            (event.offsetX / event.srcElement.clientWidth)*duration;

          // console.log(duration);
         //console.log(move_progress);

         music.currentTime = move_progress;

        });
        
        //   if music end call next song function 

        music.addEventListener("ended", nextsong);


        next.addEventListener("click", nextsong);
        prev.addEventListener("click", prevsong)