import { MigrationInterface, QueryRunner } from 'typeorm'

export class Generate1575346935706 implements MigrationInterface {
    name = 'Generate1575346935706'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "Skill" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_566c22ec29ed0c9cab8eb36ffbd" PRIMARY KEY ("id"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "Register" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "jobId" integer, CONSTRAINT "PK_5504414ba70e102c1dd649be70d" PRIMARY KEY ("id"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "User" ("id" SERIAL NOT NULL, "displayName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "about" character varying, "address" character varying, "photoURL" character varying, "isVerified" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "JobDesc" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d8b058a0b640143e91f041899ff" PRIMARY KEY ("id"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "Requirement" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b15a5e573c16b9a8dc1770bb628" PRIMARY KEY ("id"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "Job" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "quota" integer NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_981d90e7185b9ec1ee6b814ec21" PRIMARY KEY ("id"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "UserJob" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "jobId" integer, CONSTRAINT "PK_aa8019ba3dfd634da9de14b4f7f" PRIMARY KEY ("id"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "user_skills__skill" ("userId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_7e86e66739fb0de1af36bae5a8a" PRIMARY KEY ("userId", "skillId"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_c4cf29572475f5303dc0e7ea49" ON "user_skills__skill" ("userId") `,
            undefined
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_f4c42500a2ed3f102c82a2213f" ON "user_skills__skill" ("skillId") `,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "job_job_descs__job_desc" ("jobId" integer NOT NULL, "jobDescId" integer NOT NULL, CONSTRAINT "PK_7839a27f94e2107ff655aa54ca9" PRIMARY KEY ("jobId", "jobDescId"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_9c6424d4f635e03856f4e439fc" ON "job_job_descs__job_desc" ("jobId") `,
            undefined
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_01e63872328e02271ad41fe90a" ON "job_job_descs__job_desc" ("jobDescId") `,
            undefined
        )
        await queryRunner.query(
            `CREATE TABLE "job_requirements__requirement" ("jobId" integer NOT NULL, "requirementId" integer NOT NULL, CONSTRAINT "PK_ffd384f3034c9f1949a5a46a52a" PRIMARY KEY ("jobId", "requirementId"))`,
            undefined
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_915a42f4eed9a81338d02a16cd" ON "job_requirements__requirement" ("jobId") `,
            undefined
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_bfbbc1baccded6558f6eb67c26" ON "job_requirements__requirement" ("requirementId") `,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "Register" ADD CONSTRAINT "FK_ef32133941beb74a398e9830b81" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "Register" ADD CONSTRAINT "FK_3847eb32c1419901b4a290e3416" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "Job" ADD CONSTRAINT "FK_f6072b818d59e18ec417807f484" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "UserJob" ADD CONSTRAINT "FK_04d49aa7b848b25cb6dc0759fc4" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "UserJob" ADD CONSTRAINT "FK_e4385f23f12bc1648b30697c313" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "user_skills__skill" ADD CONSTRAINT "FK_c4cf29572475f5303dc0e7ea493" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "user_skills__skill" ADD CONSTRAINT "FK_f4c42500a2ed3f102c82a2213f2" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "job_job_descs__job_desc" ADD CONSTRAINT "FK_9c6424d4f635e03856f4e439fc7" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "job_job_descs__job_desc" ADD CONSTRAINT "FK_01e63872328e02271ad41fe90ad" FOREIGN KEY ("jobDescId") REFERENCES "JobDesc"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "job_requirements__requirement" ADD CONSTRAINT "FK_915a42f4eed9a81338d02a16cd2" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "job_requirements__requirement" ADD CONSTRAINT "FK_bfbbc1baccded6558f6eb67c260" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
            undefined
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "job_requirements__requirement" DROP CONSTRAINT "FK_bfbbc1baccded6558f6eb67c260"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "job_requirements__requirement" DROP CONSTRAINT "FK_915a42f4eed9a81338d02a16cd2"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "job_job_descs__job_desc" DROP CONSTRAINT "FK_01e63872328e02271ad41fe90ad"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "job_job_descs__job_desc" DROP CONSTRAINT "FK_9c6424d4f635e03856f4e439fc7"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "user_skills__skill" DROP CONSTRAINT "FK_f4c42500a2ed3f102c82a2213f2"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "user_skills__skill" DROP CONSTRAINT "FK_c4cf29572475f5303dc0e7ea493"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "UserJob" DROP CONSTRAINT "FK_e4385f23f12bc1648b30697c313"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "UserJob" DROP CONSTRAINT "FK_04d49aa7b848b25cb6dc0759fc4"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "Job" DROP CONSTRAINT "FK_f6072b818d59e18ec417807f484"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "Register" DROP CONSTRAINT "FK_3847eb32c1419901b4a290e3416"`,
            undefined
        )
        await queryRunner.query(
            `ALTER TABLE "Register" DROP CONSTRAINT "FK_ef32133941beb74a398e9830b81"`,
            undefined
        )
        await queryRunner.query(
            `DROP INDEX "IDX_bfbbc1baccded6558f6eb67c26"`,
            undefined
        )
        await queryRunner.query(
            `DROP INDEX "IDX_915a42f4eed9a81338d02a16cd"`,
            undefined
        )
        await queryRunner.query(
            `DROP TABLE "job_requirements__requirement"`,
            undefined
        )
        await queryRunner.query(
            `DROP INDEX "IDX_01e63872328e02271ad41fe90a"`,
            undefined
        )
        await queryRunner.query(
            `DROP INDEX "IDX_9c6424d4f635e03856f4e439fc"`,
            undefined
        )
        await queryRunner.query(
            `DROP TABLE "job_job_descs__job_desc"`,
            undefined
        )
        await queryRunner.query(
            `DROP INDEX "IDX_f4c42500a2ed3f102c82a2213f"`,
            undefined
        )
        await queryRunner.query(
            `DROP INDEX "IDX_c4cf29572475f5303dc0e7ea49"`,
            undefined
        )
        await queryRunner.query(`DROP TABLE "user_skills__skill"`, undefined)
        await queryRunner.query(`DROP TABLE "UserJob"`, undefined)
        await queryRunner.query(`DROP TABLE "Job"`, undefined)
        await queryRunner.query(`DROP TABLE "Requirement"`, undefined)
        await queryRunner.query(`DROP TABLE "JobDesc"`, undefined)
        await queryRunner.query(`DROP TABLE "User"`, undefined)
        await queryRunner.query(`DROP TABLE "Register"`, undefined)
        await queryRunner.query(`DROP TABLE "Skill"`, undefined)
    }
}
