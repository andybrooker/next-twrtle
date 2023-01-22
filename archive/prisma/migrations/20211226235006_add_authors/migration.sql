-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuthors" (
    "userId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAuthors_pkey" PRIMARY KEY ("userId","authorId")
);

-- AddForeignKey
ALTER TABLE "UserAuthors" ADD CONSTRAINT "UserAuthors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAuthors" ADD CONSTRAINT "UserAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
