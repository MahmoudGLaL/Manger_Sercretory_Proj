-- CreateTable
CREATE TABLE "Manger_Meetings" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "type" VARCHAR(15) NOT NULL,
    "rank" VARCHAR(20),
    "phoneNum" VARCHAR(15),
    "has_oppointment" VARCHAR(5),
    "oppointment" VARCHAR(55),
    "situation" VARCHAR(15),
    "side" VARCHAR(30) NOT NULL,
    "region" VARCHAR(70),
    "subject" VARCHAR(100),
    "status" VARCHAR(40) NOT NULL DEFAULT 'انتظار',
    "visit_times" VARCHAR(15) DEFAULT '1',
    "order" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "Manger_Meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(30) NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
