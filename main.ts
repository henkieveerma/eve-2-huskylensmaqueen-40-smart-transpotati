function line_tracking (speed: number) {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
    } else {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
            }
        } else {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
                if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
                    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
                }
            }
        }
    }
}
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
let TIME = 0
let SPEED = 100
basic.forever(function () {
    huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
    basic.pause(1000)
    for (let index = 0; index < 5; index++) {
        huskylens.request()
    }
    while (!(huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock))) {
        huskylens.request()
        line_tracking(100)
    }
    maqueen.motorStop(maqueen.Motors.All)
    huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
    basic.pause(1000)
    for (let index = 0; index < 5; index++) {
        huskylens.request()
    }
    while (!(huskylens.readeBox(1, Content1.height) > 40)) {
        huskylens.request()
        line_tracking(100)
    }
    TIME = input.runningTime()
    SPEED = 50
    while (!(input.runningTime() - TIME > 1000)) {
        line_tracking(SPEED)
    }
    SPEED = 100
    TIME = 0
})
