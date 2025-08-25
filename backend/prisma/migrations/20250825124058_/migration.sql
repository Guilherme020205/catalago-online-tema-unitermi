-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productLine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."corLine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "corLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productCapacity" (
    "id" TEXT NOT NULL,
    "Capacity" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productCapacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "idProductLine" TEXT NOT NULL,
    "idCategory" TEXT NOT NULL,
    "colorLineId" TEXT,
    "productCapacityId" TEXT,
    "Dimensions" TEXT NOT NULL,
    "Materials" TEXT NOT NULL,
    "OtherFeatures" TEXT NOT NULL,
    "Weight" TEXT NOT NULL,
    "Code" TEXT NOT NULL,
    "NCM" TEXT NOT NULL,
    "EAN" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_key" ON "public"."users"("user");

-- CreateIndex
CREATE UNIQUE INDEX "productLine_name_key" ON "public"."productLine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "corLine_name_key" ON "public"."corLine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "productCapacity_Capacity_key" ON "public"."productCapacity"("Capacity");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "public"."category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "public"."products"("name");

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_idProductLine_fkey" FOREIGN KEY ("idProductLine") REFERENCES "public"."productLine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "public"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_colorLineId_fkey" FOREIGN KEY ("colorLineId") REFERENCES "public"."corLine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_productCapacityId_fkey" FOREIGN KEY ("productCapacityId") REFERENCES "public"."productCapacity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
