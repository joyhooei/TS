/** 
 * Orchid - AudioManager.ts
 * 
 * 音频管理工具类。
 * 
 * @const AudioManager.LOOP: string
 * 声音列表的循环模式：循环播放
 * @const AudioManager.RANDOM: string
 * 声音列表的循环模式：随机播放
 * @const AudioManager.ONCE: string
 * 声音列表的循环模式：顺序播放
 * @config AudioManager.isMusicAllowed: boolean
 * 是否允许播放音乐，默认值为 true
 * @config AudioManager.isSoundAllowed: boolean
 * 是否允许播放声音，默认值为 true
 * @function AudioManager.playLoop(audioName: string): void
 * 循环播放音乐，通常用于 BGM 的播放
 * @function AudioManager.playMusic(audioName: string): void
 * 播放音乐
 * @function AudioManager.playMusicList(musicList: string[], playMode: string): void
 * 播放音乐列表，有循环播放、随机播放、顺序播放三种方式
 * @function AudioManager.stopMusic(): void
 * 停止当前正在播放的音乐
 * @function AudioManager.playSound(audioName: string): void
 * 播放声音
 * @function AudioManager.stopSound(): void
 * 停止当前正在播放的所有声音
 * 
 * @version 20180526
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

class AudioManager {
  public static readonly LOOP: string = 'LOOP'
  public static readonly RANDOM: string = 'RANDOM'
  public static readonly ONCE: string = 'ONCE'

  public static isSoundAllowed: boolean = true
  public static isMusicAllowed: boolean = true
  public static backgroundMusicChannel: egret.SoundChannel = null
  public static soundChannelList: any = {
    channel0: null,
    channel1: null,
    channel2: null,
    channel3: null,
    channel4: null,
    channel5: null,
    channel6: null,
    channel7: null,
    playCount: 0
  } 

  public static playLoop(audioName: string): void {
    if (AudioManager.isMusicAllowed) {
      AudioManager.stopMusic()
      Log('Audio', 'Play music in loop:', audioName)
      AudioManager.backgroundMusicChannel = RES.getRes(audioName).play(0, 0)
    }
  }

  public static playMusic(audioName: string): void {
    if (AudioManager.isMusicAllowed) {
      AudioManager.stopMusic()
      Log('Audio', 'Play music:', audioName)
      AudioManager.backgroundMusicChannel = RES.getRes(audioName).play(0, 1)
    }
  }

  public static playMusicList(musicList: string[], playMode: string): void {
    let now = 0
    function playModeLoop() {
      AudioManager.stopMusic()
      Log('Audio', 'Play list:', musicList[now], 'in loop mode')
      AudioManager.backgroundMusicChannel = RES.getRes(musicList[now++]).play(0, 1)
      AudioManager.backgroundMusicChannel.once(egret.Event.SOUND_COMPLETE, () => {
        if (now === musicList.length) {
          now = 0
        }
        playModeLoop()
      }, AudioManager.backgroundMusicChannel)
    }

    function playModeRandom() {
      AudioManager.stopMusic()
      Log('Audio', 'Play list:', musicList[now], 'in random mode')
      AudioManager.backgroundMusicChannel = RES.getRes(musicList[now]).play(0, 1)
      AudioManager.backgroundMusicChannel.once(egret.Event.SOUND_COMPLETE, () => {
        let temp
        temp = musicList[musicList.length - 1]
        musicList[musicList.length - 1] = musicList[now]
        musicList[now] = temp
        now = (Math.random() * musicList.length - 1) | 0
        playModeRandom()
      }, AudioManager.backgroundMusicChannel)
    }

    function playModeOnce() {
      AudioManager.stopMusic()
      if (musicList.length > 0) {
        let musicName = musicList.shift()
        Log('Audio', 'Play list:', musicName, 'in once mode')
        AudioManager.backgroundMusicChannel = RES.getRes(musicName).play(0, 1)
        AudioManager.backgroundMusicChannel.once(egret.Event.SOUND_COMPLETE, () => {
          playModeOnce()
        }, AudioManager.backgroundMusicChannel)
      } else {
        Log('Audio', 'Play list end in once mode')
      }
    }

    if (musicList.length > 0) {
      if (playMode === AudioManager.LOOP) {
        playModeLoop()
      } else if (playMode === AudioManager.RANDOM) {
        now = Math.random() * musicList.length | 0
        playModeRandom()
      } else if (playMode === AudioManager.ONCE) {
        playModeOnce()
      } else {
        throw new Error('@Orchid: 列表播放类型只能为 AudioManager.LOOP、AudioManager.RANDOM 或 AudioManager.ONCE。')
      }
    } else {
      throw new Error(`@Orchid: 在列表 ${musicList} 中没有找到音乐。`)
    }
  }

  public static stopMusic(): void {
    if (AudioManager.backgroundMusicChannel) {
      Log('Audio', 'Stop music')
      AudioManager.backgroundMusicChannel.stop()
      AudioManager.backgroundMusicChannel = null
    }
  }

  public static playSound(audioName: string): void {
    if (AudioManager.isSoundAllowed) {
      Log('Audio', 'Play sound:', audioName, 'at channel', AudioManager.soundChannelList.playCount % 8)
      let channel = 'channel' + AudioManager.soundChannelList.playCount++ % 8
      AudioManager.soundChannelList[channel] = RES.getRes(audioName).play(0, 1)
    }
  }

  public static stopSound(): void {
    if (AudioManager.backgroundMusicChannel) {
      Log('Audio', 'Stop sound(s)')
      let channelList = ['channel0', 'channel1', 'channel2', 'channel3', 'channel4', 'channel5', 'channel6', 'channel7']
      channelList.forEach(v => {
        AudioManager.soundChannelList[v].stop()
        AudioManager.soundChannelList[v] = null
      })
    }
  }
}
