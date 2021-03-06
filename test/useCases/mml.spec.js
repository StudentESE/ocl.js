const should = require('should');

require('../../generator/oclParserGenerator');
import {OclParser} from '../../src/components/parser/oclParser';
import {MetaAssociationLink, MetaEntity} from '../fixture.factory';

describe('MML', () => {
    it('MetaEntity metaAssociationLinks have different role names.', () => {
        const oclExpression = `
            context MetaEntity inv: 
                self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
        `;
        const oclRule = OclParser.parse(oclExpression);


        let metaEntity = new MetaEntity();
        metaEntity.metaAssociationLinks = [
            new MetaAssociationLink('roleA'),
            new MetaAssociationLink('roleB')
        ];
        oclRule.evaluate(metaEntity).should.be.ok();
    });

    it('MetaEntity: self.isType = true implies self.isIntrinsic = false', () => {
        const metaEntity = new MetaEntity();
        metaEntity.isType = true;
        metaEntity.isIntrinsic = false;

        const oclExpression = `
            context MetaEntity inv: 
                self.isType = true implies self.isIntrinsic = false
        `;
        const oclRule = OclParser.parse(oclExpression);

        oclRule.evaluate(metaEntity).should.be.ok();

        metaEntity.isIntrinsic = true;
        oclRule.evaluate(metaEntity).should.not.be.ok();
    });
});

